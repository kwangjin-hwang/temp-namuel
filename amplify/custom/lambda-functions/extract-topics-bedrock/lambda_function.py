import json
import boto3
import botocore
import os
import time
import random
from botocore.exceptions import ClientError

s3 = boto3.client('s3')
dynamodb = boto3.resource('dynamodb')
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name='us-east-1',
    config=botocore.config.Config(connect_timeout=1000, read_timeout=1000)
)

def lambda_handler(event, context):
    bucket_name = os.environ["BUCKET_NAME"]
    table_name = os.environ["HISTORY_TABLE_NAME"]

    uuid = event['uuid']
    source_file_key = f"videos/{uuid}/Transcript.json"

    history = dynamodb.Table(table_name)
    video_history = history.get_item(Key={'id': uuid})
    modelID = video_history['Item']['modelID']
    
    response = s3.get_object(Bucket=bucket_name, Key=source_file_key)
    transcript_json = json.load(response['Body'])
    script = transcript_json['results']['transcripts'][0]['transcript']

    topics = get_topics_from_transcript(script, modelID)

    return {
        'statusCode': 200,
        'topics': topics,
        'uuid': uuid,
        'modelID': modelID,
        'owner': video_history["Item"]["owner"],
        'script': script
    }

def invoke_bedrock_with_retry(body, modelID, max_retries=None):
    """
    Invoke Bedrock API with exponential backoff retry logic
    """
    if max_retries is None:
        max_retries = int(os.environ.get('MAX_RETRIES', '5'))
    
    initial_delay = float(os.environ.get('INITIAL_DELAY', '2'))
    
    for attempt in range(max_retries):
        try:
            response = bedrock.invoke_model(
                body=body, 
                accept='*/*', 
                contentType='application/json', 
                modelId=modelID
            )
            return response
        except ClientError as e:
            error_code = e.response['Error']['Code']
            
            # Check if it's a throttling error
            if error_code == 'ThrottlingException' or error_code == 'TooManyRequestsException':
                if attempt == max_retries - 1:
                    print(f"Max retries reached. Last error: {e}")
                    raise
                
                # Calculate exponential backoff with jitter
                base_delay = initial_delay * (2 ** attempt)  # Configurable initial delay
                jitter = random.uniform(0, 1)
                delay = base_delay + jitter
                
                print(f"Throttled. Attempt {attempt + 1}/{max_retries}. Waiting {delay:.2f} seconds...")
                time.sleep(delay)
            else:
                # For non-throttling errors, raise immediately
                raise
    
    raise Exception(f"Failed to invoke Bedrock after {max_retries} attempts")

def get_topics_from_transcript(script, modelID):
    prompt = f"""
    Human:
    Below is a transcript of a video.
    <script> {script} </script>
    Extract the agenda items from the script in the order they appear. Follow these guidelines:

    1. Aim for at least 5 topics. If the video is short, provide as many as possible.
    2. Topics should be specific and explanatory of the video's overall content.
    3. Express each topic in the script's original language.
    4. Keep proper nouns in their original language (typically English, but can be in Korean, Japanese, or other).
    5. Format each topic like a concise video title, using 8 words or less.
    6. Ensure topics follow the video's chronological order.

    Present the extracted agenda in this JSON format:
    <JSON>
    {{
    "Topics": [
        "Topic1",
        "Topic2",
        "Topic3",
        ...
        "Topic9"
    ]
    }}
    </JSON>
    Respond only with the JSON structure above, filled with the extracted topics.
        
    \n\nAssistant: <JSON>
    """

    body = json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 4096,
        "messages": [{"role": "user", "content": [{"type": "text", "text": prompt}]}],
        "temperature": 0.5,
        "top_p": 0.9
    })

    #for test, to delete later
    # modelID = "anthropic.claude-3-5-sonnet-20240620-v1:0"

    response = invoke_bedrock_with_retry(body, modelID)

    response_body = json.loads(response['body'].read())
    rawTopics = response_body['content'][0]['text']

    firstIndex = rawTopics.find('{')
    endIndex = rawTopics.rfind('}')
    
    topics = json.loads(rawTopics[firstIndex:endIndex+1])
    return topics["Topics"]
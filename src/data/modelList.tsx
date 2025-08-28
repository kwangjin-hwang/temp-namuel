// modelList.tsx

export interface ModelOption {
  name: string;
  logo: string;
  modelId: string;
  provider: string;
}

export const modelOptions: ModelOption[] = [
  {
    name: "Claude Opus 4.1",
    logo: "logos/anthropic-logo.png",
    modelId: "us.anthropic.claude-opus-4-1-20250805-v1:0",
    provider: "Anthropic"
  },
  {
    name: "Claude Sonnet 4",
    logo: "logos/anthropic-logo.png",
    modelId: "us.anthropic.claude-sonnet-4-20250514-v1:0",
    provider: "Anthropic"
  },
  // {
  //   name: "Claude 3.0 Sonnet",
  //   logo: "logos/anthropic-logo.png",
  //   modelId: "anthropic.claude-3-sonnet-20240229-v1:0",
  //   provider: "Anthropic"
  // },
  // {
  //   name: "Claude 3.0 Haiku",
  //   logo: "logos/anthropic-logo.png",
  //   modelId: "anthropic.claude-3-haiku-20240307-v1:0",
  //   provider: "Anthropic"
  // },
  // {
  //   name: "Llama 3 70b Instruct",
  //   logo: "logos/meta-logo.png",
  //   modelId: "meta.llama3-70b-instruct-v1:0",
  //   provider: "Meta"
  // },
  // {
  //   name: "Titan Text Premier",
  //   logo: "logos/amazon-logo.png",
  //   modelId: "amazon.titan-text-premier-v1:0",
  //   provider: "Amazon"
  // },
  // Add more models as needed
];
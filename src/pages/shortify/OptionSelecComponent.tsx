// import React, { useEffect, useState } from 'react';
import React from 'react';
import {
  // Spinner,
  // Box,
  Container,
  Header,
  TextContent
  // Select,
  // RadioGroup,
} from '@cloudscape-design/components';
// import ContentLayout from '@cloudscape-design/components/content-layout';
// import Container from '@cloudscape-design/components/container';
// import Header from '@cloudscape-design/components/header';
// import SpaceBetween from '@cloudscape-design/components/space-between';
// import Alert from '@cloudscape-design/components/alert';

interface OptionSelectComponentProps {
    id: string;
    // selectedImage: { label: string; value: string; imgSrc: string } | null; // imgSrc 포함
    // setSelectedImage: (value: { label: string; value: string; imgSrc: string } | null) => void;
    // titleGroupValue: string;
    // setTitleGroupValue: (value: string) => void;
    // subTitleGroupValue: string;
    // setSubTitleGroupValue: (value: string) => void;
}

// interface ImageOption {
//   label: string;
//   value: string;
//   imgSrc: string;
// }

// const imageOptions: ImageOption[] = [
//     {
//       label: 'White',
//       value: 'White',
//       imgSrc: '/amplify/assets/test.png', // 문자열 경로로 수정
//     },
//     {
//       label: 'Blue',
//       value: 'Blue',
//       imgSrc: '/amplify/assets/test.png', // 문자열 경로로 수정
//     },
//     {
//       label: 'Yellow',
//       value: 'Yellow',
//       imgSrc: '/amplify/assets/test.png', // 문자열 경로로 수정
//     },
//   ];

const OptionSelectComponent: React.FC<OptionSelectComponentProps> = (props) => {

  // const [loading, setLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setLoading(false)
  // }, [])

  // if(loading)
  //   return <Box textAlign='center'><Spinner size='large'/></Box>
  
  return (
    <Container
      header={
        <Header variant="h2">
          Option Select
        </Header>
      }
    >
    <TextContent>
      <p style={{maxHeight: "60vh", overflow: "scroll"}}>
        ${props.id}
      </p>
    </TextContent>
    </Container>
  );
};

export default OptionSelectComponent;

// const OptionSelectComponent: React.FC<OptionSelectComponentProps> = ({
//   selectedImage,
//   setSelectedImage,
//   titleGroupValue,
//   setTitleGroupValue,
//   subTitleGroupValue,
//   setSubTitleGroupValue,
// }) => {
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   const handleChange = (detail: any) => {
//     if (detail.selectedOption && detail.selectedOption.value) {
//       const selectedOption = imageOptions.find(
//         (option) => option.value === detail.selectedOption.value
//       );
//       setSelectedImage(selectedOption || null);
//     }
//   };

//   if (loading) {
//     return (
//       <Box textAlign="center">
//         <Spinner size="large" />
//       </Box>
//     );
//   }

//   return (
//     <ContentLayout
//       header={
//         <SpaceBetween size="m">
//           <Alert statusIconAriaLabel="Info">
//             Shortify 생성할 때 옵션을 선택합니다.
//           </Alert>
//         </SpaceBetween>
//       }
//     >
//       {/* 1번째 박스 영역 */}
//       <Box margin={{ bottom: 'm' }}>
//         <Container
//           header={
//             <Header
//               variant="h2"
//               description="Shortify 생성 시 배경 화면을 선택하세요."
//             >
//               Shortify 배경 화면 선택
//             </Header>
//           }
//         >
//           <Box>
//             <Select
//               selectedOption={selectedImage ? { label: selectedImage.label, value: selectedImage.value } : null}
//               onChange={({ detail }) => handleChange(detail)}
//               options={imageOptions.map((option) => ({
//                 label: option.label,
//                 value: option.value,
//               }))}
//               placeholder="Select an image"
//             />
//             {selectedImage && (
//               <Box margin={{ top: 'l' }}>
//                 <Box textAlign="center" variant="p">
//                   Preview Background Image
//                 </Box>
//                 <img
//                   src={selectedImage.imgSrc}
//                   alt={selectedImage.label}
//                   style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
//                 />
//               </Box>
//             )}
//           </Box>
//         </Container>
//       </Box>

//       {/* 2번째 박스 영역 */}
//       <Box margin={{ bottom: 'm' }}>
//         <Container
//           header={
//             <Header
//               variant="h2"
//               description="Title 생성 여부를 선택하세요."
//             >
//               Title 생성 여부
//             </Header>
//           }
//         >
//           <Box>
//             <RadioGroup
//               onChange={({ detail }) => setTitleGroupValue(detail.value)}
//               value={titleGroupValue}
//               items={[
//                 { value: 'on', label: 'On' },
//                 { value: 'off', label: 'Off' },
//               ]}
//             />
//           </Box>
//         </Container>
//       </Box>

//       {/* 3번째 박스 영역 */}
//       <Box margin={{ bottom: 'm' }}>
//         <Container
//           header={
//             <Header
//               variant="h2"
//               description="Subtitle 생성 여부를 선택하세요."
//             >
//               Subtitle 생성 여부
//             </Header>
//           }
//         >
//           <Box>
//             <RadioGroup
//               onChange={({ detail }) => setSubTitleGroupValue(detail.value)}
//               value={subTitleGroupValue}
//               items={[
//                 { value: 'on', label: 'On' },
//                 { value: 'off', label: 'Off' },
//               ]}
//             />
//           </Box>
//         </Container>
//       </Box>
//     </ContentLayout>
//   );
// };

// export default OptionSelectComponent;
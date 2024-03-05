import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Font,
  Row,
  Column,
  Text,
  Hr,
  Heading,
  Button,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const siteUrl =
  process.env.NEXT_PUBLIC_URL ?? "https://flickfiesta-seven.vercel.app";

export const ResetPassword = ({ url }) => {
  const previewText = "Reset your password";
  return (
    <Html>
      <Head>
        <Font
          fontFamily='Helvetica'
          fallbackFontFamily='sans-serif'
          webFont={{
            url: "https://fonts.cdnfonts.com/css/helvetica-255",
            format: "truetype",
          }}
          fontStyle='normal'
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className='bg-[#f6f8fd] my-auto px-2 '>
          <Container
            className=' my-[40px] bg-white px-4 py-8 rounded-md shadow-lg '
            align='left'>
            <Section align='left' className=' w-[200px]'>
              <Row>
                <Column>
                  <Img
                    src={`${siteUrl}/images/logo.png`}
                    width='40'
                    height='37'
                    alt='FilmSasa'
                  />
                </Column>
                <Column>
                  <Text className='font-bold text-2xl text-red-500'>
                    FilmSasa
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Heading className='mt-8 mb-3 text-3xl'>Password Reset</Heading>
            <Section>
              <Text>Hi,</Text>
              <Text>
                Someone, recently requested for a password change for your
                FilmSasa account. If this was you, you can set a new password
                here.
              </Text>
            </Section>
            <Section>
              <Button
                className='bg-orange-500 font-medium py-3 px-5 rounded-md cursor-pointer'
                href={url}>
                Reset Password
              </Button>
            </Section>
            <Section className='my-7'>
              <Text>
                If you do nott want to change your password or did nott request
                this, just ignore and delete this message.
              </Text>
              <Text>
                To keep your account secure, please do not forward this email to
                anyone.
              </Text>
            </Section>
            <Section>
              <Text>Best,</Text>
              <Text className='-mt-4'>FilmSasa Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPassword;

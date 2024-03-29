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
import * as React from "react";

const siteUrl =
  process.env.NEXT_PUBLIC_URL ?? "https://flickfiesta-seven.vercel.app";

export const ConfirmUserEmail = ({ url }) => {
  const previewText = "Verify your email address";
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
            <Heading className='mt-8 mb-3 text-3xl'>
              Verify your email address
            </Heading>
            <Section>
              <Text>Hi,</Text>
              <Text>
                Someone, recently used this email to create an account on
                FilmSasa. If this was you click the button below to confirm and
                verify your email account.
              </Text>
            </Section>
            <Section>
              <Button
                className='bg-orange-500 font-medium py-3 px-5 rounded-md cursor-pointer'
                href={url}>
                Verify Email
              </Button>
            </Section>
            <Section className='my-7'>
              <Text>
                If this was not you, please ignore and delete this email
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

export default ConfirmUserEmail;

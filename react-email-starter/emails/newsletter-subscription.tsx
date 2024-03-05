import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Row,
  Column,
  Text,
  Hr,
  Font,
  Heading,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

const siteUrl =
  process.env.NEXT_PUBLIC_URL ?? "https://flickfiesta-seven.vercel.app";

export const NewsLetterSubscription = () => {
  const previewText = "Newsletter Subscription";
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
        <Body className='bg-[#f6f8fd] my-auto px-2'>
          <Container
            className=' my-[60px] bg-white px-4 py-8 rounded-md shadow-lg '
            align='left'>
            <Section align='left' className=' w-[200px]'>
              <Row>
                <Column>
                  <Img
                    src={`${siteUrl}/images/logo.png`}
                    width='40'
                    height='37'
                    alt='Filmsasa logo'
                  />
                </Column>
                <Column>
                  <Text className='font-bold text-red-500 text-2xl'>
                    FilmSasa
                  </Text>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Heading className='mt-8 mb-3 text-3xl'>
              Newsletter Subscription
            </Heading>
            <Section>
              <Text>Hi,</Text>
              <Text>
                Hey there we are glad you recently subscribed to our newsletter.
                You will be informed on the latest news, changes and updates on
                FilmSasa.
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

export default NewsLetterSubscription;

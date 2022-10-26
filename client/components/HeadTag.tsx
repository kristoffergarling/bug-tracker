import Head from "next/head";

interface HeadProps {
  title: string;
}

const HeadTag: React.FC<HeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="../assets/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="../assets/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="../assets/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="../assets/favicon/site.webmanifest" />
    </Head>
  );
};
export default HeadTag;

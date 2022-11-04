import Head from "next/head";

interface HeadProps {
  title: string;
}

const HeadTag: React.FC<HeadProps> = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};
export default HeadTag;

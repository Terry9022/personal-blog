import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta
          name="google-site-verification"
          content="Z0p4aV6gaGq3412EeW1zfApdE3BA9nahgIvM0e7dtcY"
        />
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I'm Terry, a graduate student at Rensselaer Polytechnic
          Institute studying in the Information Technology department. I become
          a Software Engineer / Web Developer to realize innovative ideas using
          technology.
        </p>
        <p>Currently, I am in New York, United States.</p>
        <p>
          You can contact me on my{" "}
          <a href="https://www.linkedin.com/in/chi-ting-lu/">LinkedIn</a>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

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
          Hello, I'm Terry, an Economics Bachelor from National Taiwan
          University. I become a Software Engineer / Web Developer to realize
          innovative ideas using technology.
        </p>
        <p>I am about to go to New York, United States this Fall.</p>
        <p>
          You can contact me on my{" "}
          <a href="https://www.linkedin.com/in/chi-ting-lu/">LinkedIn</a>.
        </p>
        <button
          onClick={async () => {
            console.log("test shareButton");
            fetch(
              "https://storage.googleapis.com/memophoto/ss/20230604/71a703f142531c5a72b7abb6266353366cab55a413.mp4"
            )
              .then(function (response) {
                console.log("fetch success");
                return response.blob();
              })
              .then(function (blob) {
                var file = new File([blob], "Snapshot.mp4", {
                  type: blob.type,
                });
                var filesArray = [file];

                if (
                  navigator.canShare &&
                  navigator.canShare({ files: filesArray })
                ) {
                  navigator.share({
                    files: filesArray,
                  });
                }
              });
          }}
        >
          share video
        </button>
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

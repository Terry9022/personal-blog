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
          onClick={() => {
            console.log("test shareButton");
            if (navigator.share) {
              navigator
                .share({
                  title: "Snapshot",
                  // text: window.location.href,
                  url: window.location.href,
                  // url: "https://codepen.io/ayoisaiah/pen/YbNazJ"
                })
                .then(() => {
                  console.log("Thanks for sharing!");
                })
                .catch(console.error);
            } else {
              // shareDialog.classList.add('is-open');
              console.log("cannot share");
            }
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

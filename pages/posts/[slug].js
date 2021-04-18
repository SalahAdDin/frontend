import { Chip, Paper } from "@material-ui/core";
import { DiscussionEmbed } from "disqus-react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { BlogJsonLd } from "next-seo";
import PropTypes from "prop-types";
import { Body } from "components/body";
import Title from "components/fields/title";
import Picture from "components/fields/image";
import Layout from "components/layout";
import Loader from "components/loader";
import SEO from "components/seo";
import { getAllPagesWithSlug, getPageBySlug } from "lib/api/pages";
import { CMS_AUTHOR, CMS_URL, DISQUS_SHORT_NAME } from "lib/constants";
import useStyles from "styles/common";
import ErrorPage from "../_error";

const DISQUS_CATEGORIES = {
  general: "8664428",
  "front-end": "8755878",
  "back-end": "8755881",
  "deep-learning": "8755886",
  "video-games": "8755887",
};

const Post = ({
  slug,
  title_en: titleEn,
  title,
  thumbnail = {},
  description,
  body,
  created_at: createdAt,
  updated_at: updatedAt,
  tags,
  preview,
}) => {
  const classes = useStyles();
  const router = useRouter();

  const postURL = process.env.NEXT_PUBLIC_BASE_URL + router.asPath;

  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout preview={preview}>
      {/* TODO: It goes in every place with the structure */}
      {router.isFallback ? (
        <Loader />
      ) : (
        <>
          <SEO
            canonical={postURL}
            description={description}
            title={title}
            title_en={titleEn}
            openGraph={{
              type: "blog",
              article: {
                publishedTime: createdAt,
                modifiedTime: updatedAt,
                // expirationTime: "2022-12-21T22:04:11Z",
                section: "Posts",
                authors: [`${CMS_URL}`],
                tags: tags?.map((tag) => tag.label),
              },
              images: [
                {
                  url: thumbnail?.url,
                  width: thumbnail?.width,
                  height: thumbnail?.height,
                  alt: thumbnail?.caption,
                },
              ],
            }}
            twitter={{
              image: {
                alt: thumbnail?.caption,
              },
            }}
          />
          <BlogJsonLd
            url={postURL}
            title={titleEn}
            images={[thumbnail?.url]}
            datePublished={createdAt}
            dateModified={updatedAt}
            authorName={CMS_AUTHOR}
            description={description?.description_en}
          />
          {thumbnail && (
            <Picture
              className={classes.heroImage}
              aria-label={thumbnail?.alternativeText}
              alt={thumbnail?.alternativeText}
              title={thumbnail?.caption}
              src={thumbnail?.url}
              width={thumbnail?.width}
              height={thumbnail?.height}
            />
          )}
          <Title
            title={title}
            title_en={titleEn}
            component="h3"
            variant="h3"
            gutterBottom
          />
          <Body body={body} />
          <Paper elevation={0} className={classes.tagsContainer}>
            {tags.length > 0 &&
              tags?.map((tag) => (
                <Link href={`/tags/${tag.slug}`} passHref key={`tag_${tag.id}`}>
                  <Chip variant="outlined" label={tag.label} />
                </Link>
              ))}
          </Paper>
          {process.env.NODE_ENV === "production" && (
            <DiscussionEmbed
              shortname={DISQUS_SHORT_NAME}
              config={{
                url: postURL,
                identifier: slug,
                title: titleEn,
                /*
                Must be
                First tag: category
                Others: order does not matter
                */
                categoryId: DISQUS_CATEGORIES[tags[0]?.slug],
              }}
            />
          )}
        </>
      )}
    </Layout>
  );
};

Post.propTypes = {
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    url: PropTypes.string.isRequired,
  }),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
  preview: PropTypes.bool,
};

export const getStaticProps = async ({ params, preview = null, locale }) => {
  const data = await getPageBySlug(params.slug, preview);

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      preview,
      ...data?.pages[0],
    },
  };
};

export async function getStaticPaths() {
  const posts = await getAllPagesWithSlug();
  return {
    paths: posts?.map((post) => `/posts/${post.slug}`) || [],
    fallback: true,
  };
}

export default Post;

/* If our API gets a locale parameter:
* const paths = locales.reduce(
    (current, next) => [
      ...current,
      ...posts?.map((post) => ({
        params: { slug: `/posts/${post.slug}` },
        locale: next,
      })),
    ],
    []
  );
  * */

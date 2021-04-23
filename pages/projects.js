import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Skeleton } from "@material-ui/lab";
import { getPageBySlugAndCategory } from "lib/api/categories";
import Title from "components/fields/title";
import SEO from "components/seo";
import Category from "components/category";
import { DynamicZone } from "components/body";
import Layout from "components/layout";
import Loader from "components/loader";
import ErrorPage from "./_error";

const Projects = ({
  title_en: titleEn,
  slug,
  title,
  description,
  body,
  categories,
}) => {
  const router = useRouter();

  const contents = body.find(
    (item) => item.__typename === "ComponentContentContent"
  );

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />;

  return (
    <Layout>
      {router.isFallback ? (
        <Loader />
      ) : (
        <>
          <SEO description={description} title={title} title_en={titleEn} />
          <Title title={title} title_en={titleEn} />
          {contents ? (
            <DynamicZone component={contents} />
          ) : (
            <>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
            </>
          )}
          {categories.map((category) =>
            category.projects.length > 0 ? (
              <Category key={`category_${category.id}`} {...category} />
            ) : (
              ""
            )
          )}
        </>
      )}
    </Layout>
  );
};

Projects.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object),
};

export const getStaticProps = async ({ locale }) => {
  const data = await getPageBySlugAndCategory("projects");

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...data?.pages[0],
      categories: data?.categories,
    },
    revalidate: 1,
  };
};

export default Projects;

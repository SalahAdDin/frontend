import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Skeleton, Timeline } from "@material-ui/lab";
import { getPageBySlug } from "lib/api/pages";
import Experience from "components/content/experience";
import Title from "components/fields/title";
import { DynamicZone } from "components/body";
import Layout from "components/layout";
import Loader from "components/loader";
import SEO from "components/seo";
import ErrorPage from "./_error";

// TODO: make a base page/component and inherit education and work experience from this.
const Education = ({ title_en: titleEn, slug, title, description, body }) => {
  const router = useRouter();

  const contents = body.find(
    (item) => item.__typename === "ComponentContentContent"
  );

  const experiences = body.filter(
    (item) => item.__typename === "ComponentContentExperience"
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
          <Timeline style={{ marginTop: "4rem" }}>
            {Object.values(experiences).map((experience, i) => (
              <Experience
                key={`experience_${experience.id}`}
                last={i === experiences.length - 1}
                {...experience}
              />
            ))}
          </Timeline>
        </>
      )}
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const data = await getPageBySlug("education", false);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...data?.pages[0],
    },
    revalidate: 1,
  };
}

Education.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  tags: PropTypes.arrayOf(PropTypes.object),
  slug: PropTypes.string.isRequired,
};

export default Education;

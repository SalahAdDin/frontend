import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Skeleton } from "@material-ui/lab";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import PropTypes from "prop-types";
import { DynamicZone } from "components/body";
import Title from "components/fields/title";
import Skill from "components/fields/skill";
import Layout from "components/layout";
import Loader from "components/loader";
import SEO from "components/seo";
import { getPageBySlugAndAdditionalInformation } from "lib/api/pages";
import useGlobalStyles from "styles/common";
import ErrorPage from "./_error";

const useStyles = makeStyles((theme) => ({
  background: {
    background: "url(static/images/hero-1-bg.png) 100% top no-repeat",
    height: "130%",
    width: "100%",
    zIndex: -100,
    position: "absolute",
    top: 0,
    left: 0,
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  blogSubGrid: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "8px !important",
      paddingRight: "8px !important",
    },
  },
  hero: {
    paddingBottom: 140,
    [theme.breakpoints.up("sm")]: {
      paddingTop: 120,
    },
    "& > div:first-child > *": {
      marginBottom: "1.5rem",
    },
    "& h1": {
      fontSize: 45,
      lineHeight: "1.35",
      fontWeight: 700,
    },
    "& h2": {
      textTransform: "uppercase",
      letterSpacing: 2,
      fontWeight: 700,
      fontSize: 14,
    },
    "& p": {
      color: theme.palette.muted.main,
      lineHeight: "1.8",
    },
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: "auto",
  },
  mainPostNote: {
    cursor: "pointer",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  postNote: {
    cursor: "pointer",
    padding: 24,
    "& h5": {
      fontSize: 22,
      marginBottom: "12px !important",
    },
    "& p": { fontSize: 15 },
  },
  seeMoreLink: {
    textTransform: "none",
    margin: "1rem auto",
    "& svg": {
      marginLeft: 10,
      width: 20,
    },
  },
  sectionTitle: {
    fontWeight: 700,
    marginBottom: "3rem",
  },
  sectionContent: {
    maxWidth: "75%",
    margin: "auto",
    textAlign: "center",
  },
  skillPaper: {
    padding: 16,
    marginBottom: 24,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const ProjectCard = ({ id, title_en: titleEn, title, thumbnail, description }) => {
  const { i18n } = useTranslation();

  const localizedDescription =
    description[
      Object.keys(description).find((item) => item.split("_")[1] === i18n.language)
    ];

  return (
    <Link href={`/projects/${id}`}>
      <Card style={{ cursor: "pointer" }}>
        <CardMedia
          component={() => (
            <Image
              className="MuiAvatar-img"
              aria-label={thumbnail?.alternativeText}
              src={thumbnail?.url}
              alt={thumbnail?.alternativeText}
              title={thumbnail?.caption}
              width={thumbnail?.width}
              height={thumbnail?.height}
            />
          )}
        />
        <CardContent>
          <Title
            title={title}
            title_en={titleEn}
            component="h3"
            variant="h5"
            align="center"
            gutterBottom
          />
          <Typography variant="body2" component="p" align="center">
            {localizedDescription.split(" ").splice(0, 15).join(" ").concat("...")}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

ProjectCard.propTypes = {
  id: PropTypes.string,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  thumbnail: PropTypes.shape({
    alternativeText: PropTypes.string,
    caption: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  description: PropTypes.objectOf(PropTypes.string),
};

const PostNote = ({ slug, title_en: titleEn, title, description }) => {
  const classes = useStyles();
  const { i18n } = useTranslation();
  return (
    <Link href={`/posts/${slug}`}>
      <Paper elevation={3} className={classes.postNote}>
        <Title
          title={title}
          title_en={titleEn}
          component="h3"
          variant="h5"
          align="left"
          gutterBottom
        />
        {/* <Typography variant="body2" component="p">
          {
            description[
              Object.keys(description).find(
                (item) => item.split("_")[1] === i18n.language
              )
            ]
          }
        </Typography> */}
      </Paper>
    </Link>
  );
};

PostNote.propTypes = {
  slug: PropTypes.string,
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string),
};

const SeeMoreLink = ({ slug, label }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Link href={`${slug}`} passHref>
      <Button color="primary" className={classes.seeMoreLink}>
        {t("see-more")} {t(label)}
        <ArrowRightAltIcon />
      </Button>
    </Link>
  );
};

SeeMoreLink.propTypes = {
  slug: PropTypes.string.isRequired,
  label: PropTypes.string,
};

const Home = ({
  title_en: titleEn,
  slug,
  title,
  description,
  body,
  posts,
  projects,
}) => {
  const classes = useStyles();
  const globalClasses = useGlobalStyles();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  if (!router.isFallback && !slug) return <ErrorPage statusCode={404} />;

  const [firstPost, ...otherPost] = posts;

  const skills = body.filter((item) => item.__typename === "ComponentFieldsSkill");

  const { photo: profilePhoto, aboutme: aboutMe } = body.find(
    (item) => item.__typename === "ComponentContentPersonalInformation"
  );

  return (
    <Layout>
      {router.isFallback ? (
        <Loader />
      ) : (
        <>
          <SEO description={description} title={title} title_en={titleEn} />

          {/* Hero */}
          <div className={classes.background} />
          <Grid
            container
            component="section"
            spacing={4}
            justify="space-between"
            className={classes.hero}
          >
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" component="h2">
                {t("hero.subtitle")}
              </Typography>
              <Typography variant="h3" component="h1" color="primary">
                {t("hero.title")}
              </Typography>
              <Typography variant="body2" component="p" color="textSecondary">
                {
                  description[
                    Object.keys(description).find(
                      (item) => item.split("_")[1] === i18n.language
                    )
                  ]
                }
              </Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              {/* TODO: may we get this from the backend? */}
              <Image
                className="MuiAvatar-img"
                src="https://res.cloudinary.com/dqhx2k8cf/image/upload/v1606473428/homeherodesktop_0940cc6d70.png"
                width={500}
                height={580}
                alt="Home - Hero portrait"
                aria-label="Home - Hero portrait"
                title="Home"
              />
            </Grid>
          </Grid>

          {/* Projects */}
          {projects.length > 0 && (
            <Container component="section">
              <Typography
                component="h2"
                variant="h3"
                align="center"
                gutterBottom
                className={classes.sectionTitle}
              >
                {t("projects")}
              </Typography>
              <Grid container spacing={2}>
                {projects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <ProjectCard {...project} />
                  </Grid>
                ))}
              </Grid>
              <SeeMoreLink slug="/projects" label="projects" />
            </Container>
          )}

          {/* Blogs */}
          {posts.length > 0 && (
            <Container component="section">
              <Typography
                component="h2"
                variant="h3"
                align="center"
                gutterBottom
                className={classes.sectionTitle}
              >
                {t("posts")}
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} sm={5}>
                  {firstPost && (
                    <Link href={`/posts/${firstPost?.slug}`}>
                      <Card className={classes.mainPostNote}>
                        <CardMedia
                          component={() => (
                            <Image
                              className="MuiAvatar-img"
                              aria-label={firstPost?.thumbnail?.alternativeText}
                              src={firstPost?.thumbnail?.url}
                              alt={firstPost?.thumbnail?.alternativeText}
                              title={firstPost?.thumbnail?.caption}
                              width={firstPost?.thumbnail?.width}
                              height={firstPost?.thumbnail?.height}
                            />
                          )}
                        />
                        <CardContent>
                          <Title
                            title={firstPost?.title}
                            title_en={firstPost?.title_en}
                            component="h3"
                            variant="h5"
                            align="left"
                            gutterBottom
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  spacing={2}
                  xs={12}
                  sm={7}
                  className={classes.blogSubGrid}
                >
                  {otherPost &&
                    otherPost.map((post) => (
                      <Grid key={post?.slug} item xs={12} sm={6}>
                        <PostNote {...post} />
                      </Grid>
                    ))}
                </Grid>
              </Grid>
              <SeeMoreLink slug="/posts" label="posts" />
            </Container>
          )}

          {/* About Me */}
          <Container component="section">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              gutterBottom
              className={classes.sectionTitle}
            >
              {t("about-me")}
            </Typography>
            <DynamicZone
              className={classes.sectionContent}
              component={{ ...aboutMe, __typename: "ComponentContentContent" }}
            />
            <Card elevation={0} component="div">
              <CardHeader
                align="center"
                className={globalClasses.avatarHeader}
                avatar={
                  profilePhoto ? (
                    <Avatar
                      component={() => (
                        <Image
                          alt={profilePhoto?.alternativeText}
                          title={profilePhoto?.caption}
                          aria-label={profilePhoto?.alternativeText}
                          className="MuiAvatar-img"
                          width={240}
                          height={320}
                          src={profilePhoto?.url}
                          align="center"
                        />
                      )}
                    >
                      LA
                    </Avatar>
                  ) : (
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      className={classes.large}
                    />
                  )
                }
                title={
                  <Grid container spacing={2}>
                    {skills &&
                      skills.map((skill) => (
                        <Grid key={skill?.id} item xs={12} md={6}>
                          <Paper elevation={3} className={classes.skillPaper}>
                            <Skill {...skill} />
                          </Paper>
                        </Grid>
                      ))}
                  </Grid>
                }
              />
            </Card>
            <SeeMoreLink slug="/about-me" label="about-me" />
          </Container>
        </>
      )}
    </Layout>
  );
};

export async function getStaticProps({ locale }) {
  const data = await getPageBySlugAndAdditionalInformation("home", "blog", false);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...data?.pages[0],
      projects: data?.projects,
      posts: data?.posts,
    },
    revalidate: 60,
  };
}

Home.propTypes = {
  title_en: PropTypes.string.isRequired,
  title: PropTypes.objectOf(PropTypes.string),
  description: PropTypes.objectOf(PropTypes.string).isRequired,
  body: PropTypes.arrayOf(PropTypes.object).isRequired,
  slug: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  posts: PropTypes.arrayOf(PropTypes.object),
};

export default Home;

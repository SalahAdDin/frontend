import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const Loader = () => {
  // TODO: maybe use a spinner here
  return (
    <>
      <Typography variant="h1" style={{ marginBottom: 24, height: 150 }}>
        <Skeleton style={{ width: "50%", margin: "auto" }} height="100%" />
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 30 }}>
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 30 }}>
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 30 }}>
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
      </Typography>
      <Typography variant="body1" style={{ marginBottom: 30 }}>
        <Skeleton variant="text" height="100%" />
        <Skeleton variant="text" height="100%" />
      </Typography>
    </>
  );
};

export default Loader;

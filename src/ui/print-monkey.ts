import { decodeBase64 } from "../utils/utils";

const monkey4 =
  "ICAgICAgICAgICAgICAgICAgICAgICAgLj0iPS4KICAgICAgICAgICAgICAgICAgICAgIF8vLi0uLS5cXyAgICAgXwogICAgICAgICAgICAgICAgICAgICAoICggbyBvICkgKSAgICApKQogICAgICAgICAgICAgICAgICAgICAgfC8gICIgIFx8ICAgIC8vCiAgICAgIC4tLS0tLS0tLiAgICAgICAgXCctLS0nLyAgICAvLwogICAgIF98fn4gfn4gIHxfICAgICAgIC9gIiIiYFxcICAoKAogICA9KF98X19fX19fX3xfKT0gICAgLyAvXyxfXCBcXCAgXFwKICAgICB8Ojo6Ojo6Ojo6fCAgICAgIFxfXFxfJ19fLyBcICApKQogICAgIHw6Ojo6Ojo6W118ICAgICAgIC9gICAvYH5cICB8Ly8KICAgICB8bz09PT09PT0ufCAgICAgIC8gICAvICAgIFwgIC8KICAgICBgIiIiIiIiIiIiYCAgLC0tYCwtLSdcL1wgICAgLwogICAgICAgICAgICAgICAgICAgJy0tICItLScgICctLSc=";

export const printMonkey = () => {
  const monk = decodeBase64(monkey4);

  process.stdout.write(monk);
  process.stdout.write("\n\n");
};

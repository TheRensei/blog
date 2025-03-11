//from https://github.com/fanteastick/quartz-test/blob/921504a79b5a81ae0d006007300603948421f862/quartz/components/_Row.tsx

import { getFlexContainer } from "../util/_componentGrid";
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

export default ((children?: QuartzComponent[]) => {
  if (children) {
    return getFlexContainer(children!, 'forced-row');
  }
  else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
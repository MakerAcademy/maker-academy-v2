import Collapse from "@assets/images/misc/components/collapse.png";
import Hero1 from "@assets/images/misc/components/hero1.png";
import Quote from "@assets/images/misc/components/quote.png";
import Box from "@assets/images/misc/components/box.png";
import CTABox from "@assets/images/misc/components/cta.png";
import Vote from "@assets/images/misc/components/Vote.png";
import Vid from "@assets/images/misc/components/vid.png";
import Img from "@assets/images/misc/components/img.png";
import Code from "@assets/images/misc/components/code.png";

const ELEMENTS = [
  {
    label: "image",
    value:
      "$$\ncomponent: image\nsrc: https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png\ntitle: An Image Title\nwidth: 100%\n$$",
    image: Img,
  },
  {
    label: "video",
    value:
      "$$\ncomponent: video\nurl: https://www.youtube.com/watch?v=ysz5S6PUM-U\nwidth: 100%\nheight: 360\n$$",
    image: Vid,
  },
  {
    label: "collapse",
    value:
      "$$\ncomponent: collapse\ntitle: What is DAI?\nbody: {{\n**Markdown Body here**\nLine 1 normal\n}}\n$$",
    image: Collapse,
  },
  {
    label: "box",
    value:
      "$$\ncomponent: box\nbody: {{\n### Header Text here\n**Line 1 bold**\nLine 1 normal\n}}\n$$",
    image: Box,
  },
  {
    label: "hero_1",
    value:
      "$$\ncomponent: hero\nimage: https://static.gopro.com/assets/blta2b8522e5372af40/blt563ee3c5cea69e67/611bd591cf33c613b2c06df6/pdp-subscription-hero-image-1440-2x.jpg\nheight: 220\ncolor: invert\nbody: {{\n### Header Text here\n**Line 1 bold**\nLine 1 normal\n}}\n$$",
    image: Hero1,
  },
  {
    label: "quote",
    value:
      "$$\ncomponent: quote\ntext: Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do.\nauthor: Albert Einstein\n$$",
    image: Quote,
  },

  {
    label: "cta_box",
    value:
      "$$\ncomponent: cta_box\ntitle: MakerDao History\ndescription: Start here if you're new to MakerDAO and the Academy.\nimage: https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg\nbuttonText: Learn More\nbuttonLink: https://www.google.com/\n$$",
    image: CTABox,
  },
  {
    label: "vote_results",
    value:
      '$$\ncomponent: vote_results\ntitle: Maker Vote\ndirection: horizontal\nlabels: ["For", "Against"]\ndata: [1408, 643]\nshowLegend: true\n$$',
    image: Vote,
  },
  {
    label: "code",
    value:
      '$$\ncomponent: code\nlanguage: javascript\ncode: {{\nconsole.log("Hello World!")\n}}\n$$',
    image: Code,
  },
];

export default ELEMENTS;

/* eslint-disable react/prop-types */
export default function Header({ author }) {
  return <h1>Learning React js with WPU {author ? author : "WPU"}</h1>;
}

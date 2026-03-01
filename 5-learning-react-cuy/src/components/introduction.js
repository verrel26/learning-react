export default function Introduction(props) {
  //   console.log(props.name);
  // ini adalah functional component, karena dia hanya sebuah fungsi yang mengembalikan JSX
  return (
    <div>
      <h1>Welcome to React!</h1>
      <p>This is an introduction to React components.</p>
      <p>Hello my name is {props.name}!</p>
    </div>
  );
}

export default function middleware1({
  next,
  to
}) {
  console.log("middleware1");

  return next();
}
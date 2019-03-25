export default function middleware2({
  next,
  to
}) {
  console.log("middleware2");

  return next();
}
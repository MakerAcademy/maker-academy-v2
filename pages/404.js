// 404.js
import ErrorPage from "@page-components/Error";

export default function Custom404() {
  return (
    <>
      <ErrorPage
        statusCode={404}
        title="Sorry, page not found!"
        description="Sorry, we couldn't find the page you are looking for."
      />
    </>
  );
}

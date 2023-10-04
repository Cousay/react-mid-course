const Page404 = () => {
  return (
    <div>
      <main className="mainwrapper notfoundpage">
        <section>
          <div className="container">
            <h2 className="title --t1">404</h2>
            <p>Không tìm thấy trang</p>
            <a href="./" className="btn btn--primary">
              Trang chủ
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page404;

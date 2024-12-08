import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useQueryHook } from "../../hooks";
import "./project-details.css";
import { Grid } from "react-loader-spinner";

const LIMIT = 5;

const ProjectDetails = () => {
  const [page, setPage] = useState(1);
  const [productArray, setProductArray] = useState(null);
  const { data, isLoading, error } = useQueryHook({
    query:
      "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json",
    method: "GET",
    payload: {},
  });

  useEffect(() => {
    const slicedArray = data?.slice(page * LIMIT - LIMIT, page * LIMIT);
    if (slicedArray?.length % LIMIT !== 0) {
      const remainder = slicedArray?.length % LIMIT;
      for (let i = 1; i <= LIMIT - remainder; i++) {
        slicedArray.push({});
      }
    }
    setProductArray(slicedArray);
  }, [page, data]);

  return isLoading ? (
    <Grid
      visible
      height="80"
      width="80"
      color="#8a7968"
      ariaLabel="grid-loading"
      radius="12.5"
      wrapperStyle={{
        display: "flex",
        backgroundColor: "#eae0d5",
        flex: 1,
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
      wrapperClass="grid-wrapper"
    />
  ) : (
    <div className="product-details-container">
      {!error ? (
        <>
          <h1 className="title">Kickstarter projects</h1>
          <table className="product-details-container__table">
            <thead>
              <tr className="product-details-container__table__row__header">
                <th>S.No.</th>
                <th>Amount pledged</th>
                <th>Percentage funded</th>
              </tr>
            </thead>
            {productArray?.length ? (
              productArray?.map((item, index) => (
                <tr
                  className={`product-details-container__table__row__details ${
                    index % 2 === 0 &&
                    "product-details-container__table__row__details--even"
                  }`}
                >
                  <td style={{ textAlign: "center" }}>{item["s.no"]}</td>
                  <td style={{ textAlign: "center" }}>
                    {item.currency?.toUpperCase()} {item["amt.pledged"]}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {item["percentage.funded"]}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="product-details-container--no-entries">
                <td></td>
                <td>No Entries found</td>
                <td></td>
              </tr>
            )}
          </table>
          <Pagination
            className="product-details-container__pagination"
            shape="rounded"
            count={Math.ceil(data?.length / 5)}
            page={page}
            onChange={(_, page) => {
              setPage(page);
            }}
            color="#8a7968"
            siblingCount={0}
            boundaryCount={0}
          />
        </>
      ) : (
        <div>Error While Loading the projects</div>
      )}
    </div>
  );
};

export default ProjectDetails;

import { useEffect, useState } from "react";
import { Row, Container, Stack, Card } from "react-bootstrap";
import Hero from "./Hero";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTransactionHistory,
  formatIDR,
  getTransactionHistoryData,
} from "../features/datas/datasSlice";
import moment from "moment/moment";

const Transaction = () => {
  const dispatch = useDispatch();
  const history = useSelector(getTransactionHistoryData);
  const [offset, setOffset] = useState(5);
  useEffect(() => {
    dispatch(fetchTransactionHistory(offset));
  }, [dispatch, offset]);

  const handleShowMore = () => {
    setOffset(offset + 5);
  };

  return (
    <>
      <Container>
        <Hero />
        <Row>
          <div className="fw-bold mt-5">
            <Stack
              direction="horizontal"
              className="flex justify-content-start"
            >
              <p>Semua Transaksi</p>
            </Stack>
          </div>

          {history?.data?.records?.map((item) => (
            <Card key={item.invoice_number}>
              <div className="d-flex justify-content-between">
                <div>
                  <p
                    className={
                      item?.transaction_type == "TOPUP"
                        ? "fw-bold fs-4 text-success"
                        : "fw-bold fs-4 text-danger"
                    }
                  >
                    {item?.transaction_type == "TOPUP" ? " + " : " - "}
                    {formatIDR(item?.total_amount)}
                  </p>
                  <p>
                    {moment(item?.created_on).format("DD MMMM YYYY hh:mm")} WIB
                  </p>
                </div>
                <div>
                  {/* <p className="mt-4 mx-2 fw-bold">{item?.transaction_type}</p> */}
                  <p className="mt-4 mx-2 fw-bold">{item?.description}</p>
                </div>
              </div>
            </Card>
          ))}

          <div
            className="text-center mt-5 text-danger fw-bold"
            onClick={handleShowMore}
            style={{ cursor: "pointer" }}
          >
            Show More{" "}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Transaction;

import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChoosePageActive,
  FethcRequestOrders,
} from "../../../store/orders/actions";
import {
  getCityId,
  getCountOrders,
  getOrders,
  getPageActive,
  getRateId,
} from "../../../store/orders/selectors";
import { useCookies } from "react-cookie";
import { OrderItem } from "../../molecules/OrderItem/OrderItem";
import style from "./OrdersCard.module.css";
import cn from "classnames";
import { IOrders } from "../../../store/interfaces";
import { CustomButton } from "../../../pages/Login/Login";
import { FilterOrders } from "../../atoms/FilterOrders/FilterOrders";
import { getValueFilterOrder } from "../../../store/modalWindows/selectors";
import { toogleFilterOrder } from "../../../store/modalWindows/actions";
import { getRates } from "../../../store/rates/selectors";

export const OrdersCard = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(getOrders);
  const pageActive = useSelector(getPageActive);
  const rates = useSelector(getRates);
  const count = useSelector(getCountOrders);
  const cityId = useSelector(getCityId);
  const rateId = useSelector(getRateId);
  const valueFilterOrder = useSelector(getValueFilterOrder);

  const [cookies] = useCookies(["access_token", "refresh_token"]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(ChoosePageActive(value));
    setPage(value);
  };

  const openFilterOrder = () => dispatch(toogleFilterOrder(!valueFilterOrder));

  const countPage = Math.floor(count / 10);

  useEffect(() => {
    if (!orders.length) {
      dispatch(FethcRequestOrders(page, cookies.access_token, cityId, rateId));
    }
  }, [orders]);

  useEffect(() => {
    if (orders.length > 0 && page === pageActive) {
      dispatch(FethcRequestOrders(page, cookies.access_token, cityId, rateId));
    }
  }, [page, cityId, rateId]);



  return (
    <section className={style.section}>
      <h3 className={style.nameCard}>Список заказов</h3>
      <div className={style.block}>
        <article className={style.head}>
          <p className={style.textCount}>Заказов: {count}</p>
          <CustomButton
            onClick={openFilterOrder}
            style={{ fontSize: "11px", width: "80px", height: "25px" }}
          >
            {valueFilterOrder ? "Скрыть" : "Фильтр"}
          </CustomButton>
          <article
            className={cn(style.filterModal, {
              [style.filterModalOpen]: valueFilterOrder,
            })}
          >
            <FilterOrders />
          </article>
        </article>
        <article className={style.content}>
          <article className={style.orderItem}>
            {!!orders.length &&
              orders.map((order: IOrders) => {
                return (
                  <article className={style.item} key={order.id}>
                    <OrderItem order={order} />
                  </article>
                );
              })}
          </article>
        </article>
        <article className={style.pagination}>
          <Pagination
            count={countPage}
            color="primary"
            size="small"
            page={pageActive}
            onChange={handleChange}
            showFirstButton
            showLastButton
          />
        </article>
      </div>
    </section>
  );
};

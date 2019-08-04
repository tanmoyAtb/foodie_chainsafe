import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { getOrder, getItem, approveOrder } from "../../code/functions";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    margin: "15px 0px"
  },
  cardDelivery: {
    margin: "15px 0px",
    border: "1px solid",
    borderColor: theme.palette.primary.main
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 240,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: 14,
    color: theme.palette.writing.main
  },

}));

export default function NativeSelects(props) {
  const classes = useStyles();

  const [orders, setOrders] = React.useState([
    {
      fullAddress: "I'm right here.",
      menu: [
        { name: "idli", price: 200, count: 2 }
      ],
      amount: 400
    },
    {
      fullAddress: "I'm right there.",
      menu: [
        { name: "idli", price: 200, count: 2 }
      ],
      amount: 90
    },
    {
      fullAddress: "I'm right over here.",
      menu: [
        { name: "idli", price: 200, count: 2 }
      ],
      amount: 35
    }
  ]);

  React.useEffect(() => {
    async function getOrders() {
      let orderItem = await getOrder(0);
      if(!orderItem) return;
      let itemNames = [];
      for (let i = 0; i < orderItem.items.length; i++) {
        let myItem = await getItem(parseInt(orderItem.restaurantId), parseInt(orderItem.items[i]));
        itemNames.push({
          name: myItem.name,
          price: parseInt(myItem.price),
          count: parseInt(orderItem.quantities[i])
        });
      }
      let total = 0;
      itemNames.forEach(item => { total += item.price * item.count });
      let myOrder = {
        id: 0,
        fullAddress: orderItem.fullAddress,
        menu: itemNames,
        amount: total,
        restaurantApproved: orderItem.restaurantApproved
      }
      setOrders([myOrder]);
    }
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const approveOrderLocal = (i) => {
    approveOrder(orders[i].id);
  }

  return (
    <div>
      <div style={{ display: "flex", flex: 1, marginBottom: 40 }}>
        <div style={{ marginTop: 25 }}>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            My restaurant orders
          </Typography>
        </div>
        <div style={{ flex: 1 }} />
      </div>
      {
        orders.length ?
          orders.map((order, i) => (
            <Card key={i} className={classes.cardDelivery}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    {order.menu.map((item, i) => (
                      <div key={i} style={{ display: "flex" }}>
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="body2">{"$ " + item.price + " x " + item.count}</Typography>
                      </div>
                    ))
                    }
                  </div>
                  <div>
                    <Typography variant="h6">{"$ " + order.amount}</Typography>
                  </div>
                  {order.restaurantApproved ?
                    <Typography variant="body2" style={{textAlign: "center", marginTop: 5, marginLeft: 10}}>Approved</Typography> :
                    <Button size="small" color="primary" onClick={() => approveOrderLocal(i)}>Approve order</Button>
                  }
                </div>
              </CardContent>
            </Card>
          ))
          : <Typography variant="body2" className={classes.writing}>
            No orders.
          </Typography>
      }
    </div>
  );
}
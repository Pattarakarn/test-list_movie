import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useReducer, useRef, useState } from 'react'
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Badge } from 'primereact/badge';
import { Toast } from 'primereact/toast';
// const inter = Inter({ subsets: ['latin'] })
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmDialog'

export default function Home() {
  const [movieList, setMovieList] = useState([])
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=36959670b59d486d71b022b7cb1c7a4a&query=a")
      .then((response) => (response.json()))
      .then((json) => {
        setMovieList(json.results);
        localStorage.setItem("movies", JSON.stringify(json.results))
      });
    setMovieCart(JSON.parse(localStorage.getItem("cart")))
  }, [])

  const [movieCart, setMovieCart] = useState([])
  const addCart = (val) => {
    const movies = movieCart?.length ? [...movieCart, val] : [val]
    setMovieCart(movies)
    showSuccess(val.name)
    localStorage.setItem("cart", JSON.stringify(movies))
  }

  const toast = useRef(null);
  const showSuccess = (title) => {
    toast.current.show({
      severity: 'info',
      summary: `${title.length > 28 ? title.slice(0, 28) + "..." : title}`,
      detail: 'add to you cart',
      life: 3456
    });
  }

  const [valSearch, setValSearch] = useState("")

  const clearCart = () => {
    setMovieCart([])
    localStorage.setItem("cart", JSON.stringify([]))
  }

  return (
    <>
      <Head>
        <title>Movie App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='page-index' style={{ height: "100vh" }}>
        <Toast ref={toast} position="top-right" />

        {/* <div id="btn"
          className={styles.thirteen} style={{ width: "3.2em", height: "2em", right: 0, margin: "10px", cursor: "pointer", position: "fixed" }}
        >
          <i className="pi pi-shopping-cart icon" />
          {movieCart.length > 0 &&
            <Badge value={movieCart.length}
              style={{
                position: "absolute",
                top: "2px",
                right: "2px"
              }}
            />
          }
        </div> */}
        <MyCart movieCart={movieCart} clear={clearCart} />

        <h2 style={{ paddingTop: "20px", paddingLeft: "30px" }}>
          Movie Shop
        </h2>
        <div className={styles.center}>
          <span className="p-input-icon-right box-search">
            <i className="pi pi-search" />
            <InputText
              // value={}  
              onChange={e => setValSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  const lists = []
                  movieList.find(ele => {
                    if (ele.title.toLowerCase().includes(e.target.value.toLowerCase())) {
                      lists.push(ele)
                    }
                  })
                  setMovieList(lists)
                }
                if (!valSearch) {
                  setMovieList(JSON.parse(localStorage.getItem("movies")))
                }
              }}
              placeholder="Search" />
          </span>
        </div>

        <div className='content-movie'>
          {movieList?.map((ele, i) => (
            <div className='card-movie'>
              <div
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w200${ele.poster_path})`,
                  width: "200px",
                  height: "200px",
                  borderRadius: "6px",
                  marginBottom: "10px",
                  margin: "auto"
                }}
              />
              <p>
                {ele.title}
              </p>
              <div className='cart'
                onClick={() => addCart({ name: ele.title, price: 100 })}>
                <div style={{ width: "70%", display: "inline-block" }}>
                  100
                  {/* on your cart */}
                </div>
                <i className="pi pi-shopping-cart icon" />
              </div>
            </div>
          ))}
          {!movieList.length &&
            <center>
              No results found
            </center>
          }
        </div>
      </main>
    </>
  )
}

function MyCart(props) {
  const [movieCart, setMovieCart] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const productService = new ProductService();
  const op = useRef(null);
  const toast = useRef(null);
  const isMounted = useRef(false);

  useEffect(() => {
    setCart()
  }, [props.movieCart])

  const setCart = () => {
    const lists = []

    props.movieCart?.map(ele => {
      const ind = lists.findIndex(val => val.name == ele.name)
      if (ind >= 0) {
        lists[ind].amount += 1
        lists[ind].price = lists[ind].price + ele.price
      } else {
        lists.push({ ...ele, amount: 1 })
      }
    })

    if (lists.length) {
      let sum = 0, amount
      lists.forEach(e => { sum += e.price; })

      if (props.movieCart.length > 3) {
        console.log(sum * 0.1)
        sum -= sum * 0.1
      }
      amount = lists.reduce((acc, cur) => acc + cur.amount, 0);
      lists.push({
        name: "Total",
        amount: amount,
        price: sum
      })
    }
    setMovieCart(lists)
  }

  // useEffect(() => {
  //   if (isMounted.current && selectedProduct) {
  //     op.current.hide();
  //     toast.current.show({ severity: 'info', summary: 'Product Selected', detail: selectedProduct.name, life: 3000 });
  //   }
  // }, [selectedProduct]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isMounted.current = true;
    setCart()
    // productService.getProductsSmall().then(data => setProducts(data));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  const onProductSelect = (e) => {
    setSelectedProduct(e.value);
  }

  const imageBody = (rowData) => {
    return <img src={`images/product/${rowData.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
  }

  const priceBody = (rowData) => {
    return formatCurrency(rowData.price);
  }

  const [visible, setVisible] = useState(false)
  const showPayment = (event) => {
    const myConfirm = confirmDialog({
      target: event.currentTarget,
      message: 'Are you sure you want to proceedss?',
      icon: '',
      accept: () => acceptFunc(),
      reject: () => rejectFunc()
    });

    setTimeout(() => {
      myConfirm.hide();

      setTimeout(() => {
        myConfirm.show();
      }, 1000);
    }, 500);
  }
  const [time, setTime] = useState()
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (time == 1) {
        setVisible(false)
      } else {
        setTime(time - 1)
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div>
      {/* <Toast ref={toast} /> */}
      <div className="card">
        <div id="btn"
          className={styles.thirteen} style={{ width: "3.2em", height: "2em", right: "15px", margin: "10px", cursor: "pointer", position: "fixed" }}
          onClick={(e) => op.current.toggle(e)}
        >
          <i className="pi pi-shopping-cart icon" />
          {props.movieCart?.length > 0 &&
            <Badge value={props.movieCart.length}
              style={{
                position: "absolute",
                top: "2px",
                right: "2px"
              }}
            />
          }
        </div>
        <OverlayPanel ref={op} id="overlay_panel" style={{ width: '450px' }}>
          {movieCart?.length
            ?
            <>
              <DataTable value={movieCart}
              // paginator rows={10}
              // selection={selectedProduct} onSelectionChange={onProductSelect} selectionMode="single"
              >
                {/* <Column field="name" header="Name" sortable /> */}
                <Column field="name" header="List" />
                <Column field="amount" header="Amount" align='center' />
                <Column field="price" header="Price" align='center' />
              </DataTable>
              <p className='text-alert'>
                {props.movieCart.length >= 5 ?
                  `You've got 20% discount!`
                  :
                  props.movieCart.length >= 3 && `You've got 10% discount. Add ${5 - props.movieCart.length} more for get 20% discount!`
                }
              </p>
              <center>
                <ConfirmDialog target={document.getElementById('button')} visible={visible}
                  onHide={() => setVisible(false)}
                  style={{ width: "50vw" }}
                  message={`Please payment in ${time || ''} s`}
                  icon=""
                  // accept={accept} reject={reject} 
                  acceptLabel='OK'
                  rejectLabel='Cancel'
                />

                <Button onClick={() => props.clear()}
                  className="btn-clear">
                  Clear
                </Button>
                <Button onClick={() => { setVisible(true); setTime(6) }} id='button'>
                  Order
                </Button>
              </center>
            </>
            :
            <center>
              Cart is empty
            </center>
          }
          {/* <ConfirmPopup /> */}
        </OverlayPanel>
      </div>
    </div>
  )
}
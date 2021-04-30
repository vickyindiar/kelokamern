import bcrypt from 'bcrypt';

const roles = [
    {name: 'admin'},
    {name: 'kasir'}
]

const users = [
    {name:'vicky', email:'vickynewonline@gmail.com', password: bcrypt.hashSync('programmer3', 10), role:'admin'},
    {name:'admin', email:'admin@admin.com', password: bcrypt.hashSync('admin', 10), role:'admin'},
    {name:'maang', email:'maang@super.com', password: bcrypt.hashSync('supermaang', 10), role:'kasir'}
]

const profiles = [
    {user: 'vicky', name:'vicky', address: 'kec. babelan - bekasi', phone: '0812345678', image:'/image/vicky.jpg', desc:'no decs'},
    {user: 'admin', name:'admin', address: 'jakarta', phone: '0855667788', image:'/image/admin.jpg', desc:'admin'},
    {user: 'maang', name:'super maang', address: 'bandung', phone: '0819000001', image:'/image/kasir.jpg', desc:'first cashier'}
]

const brands = [
    {name:'luthviear', desc:'sekolah'},
    {name:'no label', desc:'kosongan'},
    {name:'dona & doni', desc:'sport'}
]

const categories = [
    {code: 'skl', name:'sekolah', desc:'sd smp sma'},
    {code: 'ksg', name:'kosongan', desc:'tanpa label'},
    {code: 'spt', name:'sport', desc:''},
    {code: 'mst', name:'manset', desc:'sarung tangan'},
    {code: 'msk1', name:'masker kain', desc:'masker kain'},
    {code: 'msk2', name:'masker', desc:'masker sekali pakai'},
    {code: 'bff', name:'buff', desc:''},
    {code: 'kds', name:'anak', desc:''},
    {code: 'man', name:'pria', desc:'kerja pria'},
    {code: 'lds', name:'wanita', desc:''}
]

const qtytypes = [
    {name:'pcs', desc:'piece'},
    {name:'pack', desc:'10pcs'},
    {name:'lusin', desc:'12pcs'},
    {name:'kodi', desc:'20pcs'}
]

const customers = [
    {
        name:'hermione', 
        address:'jl. anggrek',
        city:'bandung', 
        province:'jawa barat', 
        phone:'08232323232', 
        phone2: '087812344567',
        store:'anggrek shocks',
        photo:'./image/anggrek.jpg',
        desc:''
    },
    {
        name:'harry potter', 
        address:'jl. kenangan',
        city:'tanggerang', 
        province:'jawa barat', 
        phone:'08232111132', 
        phone2: '',
        store:'',
        photo:'',
        desc:''
    },
    {
        name:'ronald weasley', 
        address:'jl. jambu 2',
        city:'kerawang', 
        province:'jawa barat', 
        phone:'0811222334455', 
        phone2: '',
        store:'ron butik',
        photo:'./image/ronald.jpg',
        desc:''
    },
    {
        name:'severus snape', 
        address:'jl. darkness',
        city:'kuningan', 
        province:'jawa barat', 
        phone:'081289923120', 
        phone2: '',
        store:'',
        photo:'./image/severus.jpg',
        desc:''
    }
]

const suppliers = [
    {
        name:'abadi kaos', 
        address:'jl. keramat',
        city:'jakarta', 
        province:'jakarta', 
        phone:'08129909090', 
        phone2: '02189187787',
        store:'abadi kaos',
        photo:'./image/abadi-kaos.jpg',
        desc:'supplier sekolah'
    },
    {
        name:'dona & doni', 
        address:'jl. angker',
        city:'bandung', 
        province:'jawa barat', 
        phone:'081588588512', 
        phone2: '0887676129',
        store:'dona & doni',
        photo:'',
        desc:'sport'
    },
    {
        name:'pt softies', 
        address:'jl. mangga mengkel',
        city:'cikarang', 
        province:'jawa barat', 
        phone:'08971201202', 
        phone2: '0218934448',
        store:'pt softies',
        photo:'./image/softies.jpg',
        desc:'masker'
    },
    {
        name:'pt conclusio', 
        address:'jl. kampung anyar',
        city:'brebes', 
        province:'jawa barat', 
        phone:'081289923120', 
        phone2: '',
        store:'pt conclusion',
        photo:'./image/severus.jpg',
        desc:'manset'
    }
]

const products = [
{ code: 1, name: 'SD', sprice: 25000, bprice: 18000, qtytype:'lusin', stock:120, category:'skl', supplier:'abadi kaos', brand:'luthviear', color:'hitam / putih / putih hitam', image: '/image/sd.jpg', desc:'' },
{ code: 2, name: 'SMP', sprice: 30000, bprice: 25000, qtytype:'lusin', stock:178, category:'skl', supplier:'abadi kaos', brand:'luthviear', color:'hitam / putih / putih hitam', image: '/image/sd.jpg', desc:'' },
{ code: 3, name: 'SMA', sprice: 35000, bprice: 30000, qtytype:'lusin', stock:651, category:'skl', supplier:'abadi kaos', brand:'luthviear', color:'hitam / putih / putih hitam', image: '/image/sma.jpg', desc:'' },
{ code: 4, name: 'SD GRESS', sprice: 20000, bprice: 15000, qtytype:'lusin', stock:88, category:'skl', supplier:'abadi kaos', brand:'no label', color:'hitam / putih / putih hitam', image: '/image/sd-gress.jpg', desc:'' },
{ code: 5, name: 'SMP GRESS', sprice: 22000, bprice: 18000, qtytype:'lusin', stock:55, category:'skl', supplier:'abadi kaos', brand:'no label', color:'hitam / putih / putih hitam', image: '/image/smp-gress.jpg', desc:'' },
{ code: 6, name: 'SMA GRESS', sprice: 25000, bprice: 20000, qtytype:'lusin', stock:721, category:'skl', supplier:'abadi kaos', brand:'no label', color:'hitam / putih / putih hitam', image: '/image/sma-gress.jpg', desc:'' }
]

const orders = [
    {
        order_no:'8765HERM280121', /*rundom number 4 DIGIT +customer first four + date +*/
        order_date:'2021-01-21',
        invoice:'INV-1HERM280121', /* INV - Generate digit + customer first four + date */
        customer:'hermione',
        user:'admin',
        stotal: 75000,
        gdisc:1000, 
        gtotal:74000 
    }
]

const orderDetails = [
    { order_no:'8765HERM280121', product:'SD', qty:2, qtytype:'lusin', disc:0, price:25000, total:50000 },
    { order_no:'8765HERM280121', product:'SMP', qty:1, qtytype:'lusin', disc:1000, price:25000, total: 24000 }
]

const invoices = [
    { 
      invoice_no:'INV-1HERM280121', 
      invoice_date:'2021-01-21', 
      customer:'hermione',
      user:'admin',
      status: 'lunas', //['paid', pending] = ['lunas', 'tunda']
      due_date:null, // must be set if status = pending
      payment:['cash', 'transfer'],
      add_charge: 10000,
      add_disc: 5000,
      total: 74000,
      gtotal: 79000,
      cash: 50000,
      transfer: 29000,
      change_due:0,
      note:'pengiriman: 10000' 
    }
]

export { roles, users, profiles, brands, categories, qtytypes,
     customers, suppliers, products, orders, orderDetails, invoices }
import Category from "@/views/Category"
import ShoppingCar from "@/views/ShoppingCar"
import Search from "@/views/Search"
export const routes = [{
        path: '/',
        name: "Home",
        component: Category
    },
    {
        path: '/category',
        name: "Category",
        component: Category
    },
    {
        path: '/shopping',
        name: "Shopping",
        component: ShoppingCar
    },
    {
        path: '/mine',
        name: "Mine",
        component: Category
    },
    {
        path: '/search',
        name: "Search",
        component: Search
    }
]
import styles from '../styles/Home.module.css'
import Layout from "../components/Layout/Layout";
import axios from "axios";
import SearchInput from "../components/SearchInput/SearchInput";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import {useState} from "react";

export default function Home({countries}) {

    const [keyword, setKeyword] = useState("");

    const filterCountries = countries.filter(country =>
        country.name.toLowerCase().startsWith(keyword) ||
        country.region.toLowerCase().startsWith(keyword) ||
        country.subregion.toLowerCase().startsWith(keyword) ||
        country.capital.toLowerCase().startsWith(keyword))

    const onInputChange = (e) => {
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };


    return <Layout>
        <div className={styles.input_container}>
            <div className={styles.counts}>Found {countries.length} countries</div>
            <div className={styles.input}>
                <SearchInput placeholder="Filter by name, Region or SubRegion or Capital" onChange={onInputChange}/>
            </div>
        </div>
        <CountriesTable countries={filterCountries}/>
    </Layout>
}

export const getStaticProps = async () => {
    const res = await axios.get("https://restcountries.eu/rest/v2/all");
    const countries = await res.data;

    return {
        props: {countries}
    }
}

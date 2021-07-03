import axios from "axios";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";
import {useEffect, useState} from "react";


const getCountry2 = async (id) => {
    const res = await axios.get("https://word-ranks-backend.herokuapp.com/api/country/" + id)
    return res.data.data;
}

const Country = ({country}) => {
    const [borders, setBorders] = useState([]);

    const getBorders = async () => {
        const borders = [];

        for (const b of country.borders) {
            borders.push(await getCountry2(b));
        }

        setBorders(borders)
    }

    useEffect(() => {
        getBorders()
    }, []);


    return <Layout title={country.name}>
        <div className={styles.container}>
            <div className={styles.container_left}>
                <div className={styles.overview_panel}>
                    <img src={"https://word-ranks-backend.herokuapp.com/api/data/img/" + country.alpha3Code}
                         alt={country.name}/>
                    <h1 className={styles.overview_name}>{country.name}</h1>
                    <div className={styles.overview_region}>{country.region}</div>

                    <div className={styles.overview_numbers}>
                        <div className={styles.overview_population}>
                            <div className={styles.overview_value}>{country.population}</div>
                            <div className={styles.overview_label}>Population</div>
                        </div>
                        <div className={styles.overview_area}>
                            <div className={styles.overview_value}>{country.area}</div>
                            <div className={styles.overview_label}>Area</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.container_right}>
                <div className={styles.details_panel}>
                    <h4 className={styles.details_panel_heading}>Details</h4>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Capital</div>
                        <div className={styles.details_panel_value}>{country.capital}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Subregion</div>
                        <div className={styles.details_panel_value}>{country.subregion}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Languages</div>
                        <div
                            className={styles.details_panel_value}>{country.languages.map(it => it.name).join(", ")}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Currencies</div>
                        <div
                            className={styles.details_panel_value}>{country.currencies.map(it => it.name).join(", ")}</div>
                    </div>

                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Native name</div>
                        <div className={styles.details_panel_value}>{country.nativeName}</div>
                    </div>
                    <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Gini</div>
                        <div className={styles.details_panel_value}>{country.gini} %</div>
                    </div>

                    <div className={styles.details_panel_borders}>
                        <div className={styles.details_panel_borders_label}>Neighbouring Countries</div>
                        <div className={styles.details_panel_borders_container}>
                            {borders.map(({alpha3Code, name}) =>
                                (<div className={styles.details_panel_borders_country} key={name}>
                                    <img src={"https://word-ranks-backend.herokuapp.com/api/data/img/" + alpha3Code}
                                         alt={name}/>
                                    <div className={styles.details_panel_borders_name}>{name}</div>
                                </div>)
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </Layout>
}
export const getStaticPaths = async () => {
    const res = await axios.get("https://word-ranks-backend.herokuapp.com/api/country/all");
    const countries = await res.data;


    const paths = countries.map((country) => ({
        params: {id: country.alpha3Code},
    }))


    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps = async ({params}) => {
    const country = await getCountry2(params.id);

    // console.log(await getCountry2("AFG"));


    return {
        props: {country}
    }
}

export default Country;
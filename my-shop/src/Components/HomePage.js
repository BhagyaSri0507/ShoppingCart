import React, { useEffect, useState } from "react";
import api from "../api/baseUrl";
import Carousel from "react-bootstrap/Carousel";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const [bannerInfo, setBannerInfo] = useState([]);
  const [categoryInfo, setCatergoryDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const bannerInfo = async () => {
      const bannerdetails = await getBannerInfo();
      if (bannerdetails) {
        console.log(bannerdetails);
        setBannerInfo(bannerdetails);
      }
    };
    bannerInfo();
    const categoryInfo = async () => {
      const categoryDetails = await getCatergoryInfo();
      if (categoryDetails) {
        console.log(categoryDetails);
        categoryDetails.sort((a, b) => {
          return a.order - b.order;
        });
        setCatergoryDetails(categoryDetails);
      }
    };
    categoryInfo();
  }, []);
  const getBannerInfo = async () => {
    const response = await api.get("/banners");
    return response.data;
  };
  const getCatergoryInfo = async () => {
    const response = await api.get("/categories");
    return response.data;
  };
  const gotoCategory = (id) => {
    navigate("/products", { state: id });
  };

  return (
    <>
      <div className="home-page">
        {bannerInfo.length > 0 && (
          <div className="banner-section">
            <Carousel>
              {bannerInfo.map((info) => {
                return (
                  <Carousel.Item key={info.id}>
                    <div>
                      <img
                        className="d-block w-100"
                        src={info.bannerImageUrl}
                        alt={info.bannerImageAlt}
                      />
                    </div>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
        )}
        {categoryInfo.length > 0 &&
          categoryInfo.map((info, index) => {
            if (info.enabled) {
              return (
                <div
                  key={info.key}
                  className="category-item"
                  style={{
                    flexDirection: index % 2 == "0" ? "row" : "row-reverse",
                  }}
                >
                  <img
                    src={info.imageUrl}
                    alt={info.key}
                    width={300}
                    height={200}
                  />
                  <div className="details-wrap">
                    <span className="cls-name">{info.name}</span>
                    <span className="cls-desc">{info.description}</span>
                    <button
                      className="category-btn"
                      onClick={() => gotoCategory(info.id)}
                    >
                      {`Explore ${info.key}`}
                    </button>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </>
  );
};
export default HomePage;

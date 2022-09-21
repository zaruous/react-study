import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useState } from "react";
import { useEffect } from "react";

function KakaoMap(){
    /* 현재 위치를 Hello World로 표시 */
    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat: 37.49676871972202, lng: 127.02474726969814 },
        // 지도 위치 변경시 panto를 이용할지(부드럽게 이동)
        isPanto: true,
      });

    const currentMyLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                setState({
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    ...state,
                });
            });
        }   
    };


    const [searchAddress, SetSearchAddress] = useState();
// 주소 입력후 검색 클릭 시 원하는 주소로 이동
    const searchAddressClick = () => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchAddress, (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                setState({
                    center: {
                        lat: result[0].y,
                        lng: result[0].x,
                    },
                    ...state,
                });
            }
        });
    };

    
    
    const handleSearchAddress = (e) => {
        SetSearchAddress(e.target.value)
    }

    return (
        <div>
            <button onClick={currentMyLocation}>현재 위치</button>
            <div>
                <input onChange={handleSearchAddress}></input>
                <button onClick={searchAddressClick}>클릭</button>
            </div>

            <Map
                center={state.center}
                style={{ width: "100%", height: "70vh" }}
                level={4}
            >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                <div style={{color:"#000"}}>Hello World!</div>
            </MapMarker>
            </Map>
        </div>
      )
}

export default KakaoMap;
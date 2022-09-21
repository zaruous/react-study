import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useRef, useState } from "react";
import { useEffect } from "react";

function KakaoMap(){

    
    const mapRef = useRef(null);
    const [info, setInfo] = useState();
    const [markerPosition, setMarkerPosition] = useState({
        center:
        {
            lat: 0,
            lng: 0
        },
    });

    const [state, setState] = useState({
        // 지도의 초기 위치
        center: { lat:  37.364934, lng: 126.66261 },
        // 지도 위치 변경시 panto를 이용할지에 대해서 정의
        isPanto: false,
        level : 2,
    });
    
    //버스정류장 정보


    const currentMyLocation = () => {
        if(navigator.geolocation){
            
            navigator.geolocation.getCurrentPosition((position) => {

                console.log("현재 좌표 : " + position.coords.latitude + ", " + position.coords.longitude);
                if(info)
                {
                    setState({
                        ...state,
                         center: info.center,
                     });
                }
                

                setState({
                   ...state,
                    center: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    
                });

                //alert(state.center.lat + " " + state.center.lng);
            }, err=> {
                console.log(err.message);
            },
            {timeout:3000});
        }   
    };

      return (
        <>
        <div>현재 좌표 {state? state.center.lat : null} : {state? state.center.lng : null} </div>
          <Map // 지도를 표시할 Container
            center={state.center}
            isPanto={state.isPanto}
            style={{
              // 지도의 크기
              width: "100%",
              height: "450px",
            }}
            level={state.level} // 지도의 확대 레벨
            ref={mapRef}
            onCenterChanged={() => {
                const map = mapRef.current;
                setInfo({
                    center: {
                        lat: map.getCenter().getLat(),
                        lng: map.getCenter().getLng(),
                    },
                    level: map.getLevel(),
                    typeId: map.getMapTypeId(),
                    swLatLng: {
                        lat: map.getBounds().getSouthWest().getLat(),
                        lng: map.getBounds().getSouthWest().getLng(),
                    },
                    neLatLng: {
                        lat: map.getBounds().getNorthEast().getLat(),
                        lng: map.getBounds().getNorthEast().getLng(),
                    },
                    });
               
            }}
            onClick={(_t, mouseEvent) => setMarkerPosition({
                center:{
                    lat: mouseEvent.latLng.getLat(),
                    lng: mouseEvent.latLng.getLng(),
                }
              })}

          >
            
            <MapMarker
                position={markerPosition.center}
            />

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                onClick={() =>
                  setState({
                    ...state,
                    center: { lat: 33.452613, lng: 126.570888 },
                  })
                }
              >
                지도 중심좌표 이동시키기
              </button>
              <button
                onClick={() =>
                  setState({
                    ...state,
                    center: { lat: 33.45058, lng: 126.574942 },
                  })
                }
              >
                지도 중심좌표 부드럽게 이동시키기
              </button>
              <button onClick={currentMyLocation}>현재 좌표 바꾸기</button>
              <button onClick={() => {
                const map = mapRef.current
                setInfo({
                center: {
                    lat: map.getCenter().getLat(),
                    lng: map.getCenter().getLng(),
                },
                level: map.getLevel(),
                typeId: map.getMapTypeId(),
                swLatLng: {
                    lat: map.getBounds().getSouthWest().getLat(),
                    lng: map.getBounds().getSouthWest().getLng(),
                },
                neLatLng: {
                    lat: map.getBounds().getNorthEast().getLat(),
                    lng: map.getBounds().getNorthEast().getLng(),
                },
                })
             }}>
                정보 가져 오기!
            </button>
            </div>

          </Map>
          {info && (
            <div>
              <p>위도 : {info.center.lat}</p>
              <p>경도 : {info.center.lng}</p>
              <p>레벨 : {info.level}</p>
              <p>타입 : {info.typeId}</p>
              <p>남서쪽 좌표 : {info.swLatLng.lat}, {info.swLatLng.lng}</p>
              <p>북동쪽 좌표 : {info.neLatLng.lat}, {info.neLatLng.lng}</p>
            </div>
          )}
        </>
      )
}

export default KakaoMap;
class MapIcon {
    constructor(iconRel,lat,long,markerClusters) {
        this.iconRel = iconRel;
        this.lat = lat;
        this.long = long;
        this.cluster = markerClusters;
    }

    initIcon() {

        const iconElt = L.icon({
            iconUrl: this.iconRel,
            iconSize: [40, 40],
            iconAnchor: [25, 50],
			popupAnchor: [-3, -76],
        });
        const marker = L.marker([this.lat, this.long], {icon: iconElt});
        this.cluster.addLayer(marker);
        return marker;
    }
}
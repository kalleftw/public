import { OpenStreetMapProvider } from "leaflet-geosearch";

test('Test for coordinates to Vetlanda', async ()  => {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search("Vetlanda");
    expect(results[0].x).toEqual("58.66575367702765");
    expect(results[0].y).toEqual("52.720609318807455");
  })

  
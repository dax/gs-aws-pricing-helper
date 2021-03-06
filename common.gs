regions = {
  "us-east"       : "us-east",
  "us-west-1"     : "us-west",
  "us-west-2"     : "us-west-2",
  "eu-west-1"     : "eu-ireland",
  "ap-southeast-1": "apac-sin",
  "ap-southeast-2": "apac-syd",
  "ap-northeast-1": "apac-tokyo",
  "sa-east-1"     : "sa-east-1"
}

function onInstall(e) {
  onOpen(e);
}

function callback(json) {
  return eval(json);
}

function getOdRegion(region) {
  return regions[getRiRegion(region)];
}

function getRiRegion(region) {
  if(region) { return region; }
  return "ap-northeast-1";
}

function onOpen(e){
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createAddonMenu();
  menu.addItem('Show manual', 'showSideManual');
  menu.addToUi();
}

function showSideManual() {
  var html = HtmlService.createHtmlOutputFromFile('SideManual');
  html.setTitle('AWS Pricing Helper Manual');
  var ui = SpreadsheetApp.getUi();
  ui.showSidebar(html);
}

function getPriceData(url) {
  var key = Utilities.base64Encode(url);
  var cache = CacheService.getPublicCache();
  var cached = cache.get(key);
  if (cached == null) {
    cached = UrlFetchApp.fetch(url).getContentText();
    cache.put(key, cached);
  }
  return cached;
}

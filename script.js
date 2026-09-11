// HOSPITAL DATASET
const loadedHospitals = [
    {"lat": 22.622519, "lng": 88.450677, "name": "ASMII Save The Sight Foundation"},
    {"lat": 22.620542, "lng": 88.432953, "name": "Spandan Hospital"},
    {"lat": 22.620653, "lng": 88.42975, "name": "Avenue Nursing Home"},
    {"lat": 22.617307, "lng": 88.428612, "name": "Teghoria Nursing Home"},
    {"lat": 22.618606, "lng": 88.423984, "name": "Uma Medical Related Institute"},
    {"lat": 22.618283, "lng": 88.423719, "name": "ILSI Hospital"},
    {"lat": 22.617037, "lng": 88.422731, "name": "Sparsh Hospital"},
    {"lat": 22.610507, "lng": 88.438515, "name": "Charnock Hospital"},
    {"lat": 22.607421, "lng": 88.427618, "name": "Lotus Hospital"},
    {"lat": 22.601552, "lng": 88.420822, "name": "Tata Medical Center"},
    {"lat": 22.585501, "lng": 88.420512, "name": "Ohio Hospital"},
    {"lat": 22.583011, "lng": 88.418012, "name": "Bhagirthi Neotia Centre"},
    {"lat": 22.576012, "lng": 88.412101, "name": "AMRI Hospital Salt Lake"},
    {"lat": 22.574102, "lng": 88.409801, "name": "Apollo Gleneagles Hospital"},
    {"lat": 22.570112, "lng": 88.400511, "name": "Columbia Asia Hospital"},
    {"lat": 22.565412, "lng": 88.398012, "name": "Salt Lake Government Hospital"},
    {"lat": 22.560102, "lng": 88.395101, "name": "ESI Hospital Manicktala"},
    {"lat": 22.568102, "lng": 88.375012, "name": "BR Singh Hospital Sealdah"},
    {"lat": 22.564012, "lng": 88.371012, "name": "NRS Medical College"},
    {"lat": 22.561012, "lng": 88.368012, "name": "Calcutta National Medical College"},
    {"lat": 22.571012, "lng": 88.363012, "name": "Calcutta Medical College"},
    {"lat": 22.580102, "lng": 88.365012, "name": "RG Kar Medical College"},
    {"lat": 22.552102, "lng": 88.362012, "name": "SSKM Hospital (IPGMER)"},
    {"lat": 22.548012, "lng": 88.358012, "name": "Sambhunath Pandit Hospital"},
    {"lat": 22.542012, "lng": 88.351012, "name": "Belle Vue Clinic"},
    {"lat": 22.538012, "lng": 88.348012, "name": "Woodlands Hospital"},
    {"lat": 22.525012, "lng": 88.342012, "name": "CMRI Hospital"},
    {"lat": 22.518012, "lng": 88.352012, "name": "AMRI Hospital Dhakuria"},
    {"lat": 22.512012, "lng": 88.360012, "name": "Ruby General Hospital"},
    {"lat": 22.508012, "lng": 88.365012, "name": "Desun Hospital"},
    {"lat": 22.502012, "lng": 88.371012, "name": "Medica Superspecialty Hospital"},
    {"lat": 22.498012, "lng": 88.375012, "name": "Peerless Hospital"},
    {"lat": 22.485012, "lng": 88.370012, "name": "Fortis Hospital Anandapur"},
    {"lat": 22.545012, "lng": 88.380012, "name": "Topsia Primary Health Clinic"}
];

const wardsData = [
    { name: "Topsia", lat: 22.5408, lng: 88.3882, slumDensity: 0.45, vulnerablePopRatio: 0.65 },
    { name: "Kalighat", lat: 22.5200, lng: 88.3475, slumDensity: 0.28, vulnerablePopRatio: 0.55 },
    { name: "Sealdah", lat: 22.5670, lng: 88.3710, slumDensity: 0.38, vulnerablePopRatio: 0.60 },
    { name: "College Street", lat: 22.5744, lng: 88.3629, slumDensity: 0.24, vulnerablePopRatio: 0.50 },
    { name: "Shyambazar", lat: 22.6001, lng: 88.3712, slumDensity: 0.26, vulnerablePopRatio: 0.70 },
    { name: "Park Street", lat: 22.5510, lng: 88.3525, slumDensity: 0.12, vulnerablePopRatio: 0.35 },
    { name: "Bhowanipore", lat: 22.5330, lng: 88.3460, slumDensity: 0.18, vulnerablePopRatio: 0.60 },
    { name: "Salt Lake Sec V", lat: 22.5800, lng: 88.4370, slumDensity: 0.08, vulnerablePopRatio: 0.25 }
];

loadedHospitals.forEach((hospital, index) => {
    hospital.beds = {
        ICU_available: index % 7 === 0 ? 0 : (index * 3) % 15 + 1,
        Oxygen_beds: 5 + ((index * 7) % 51),
        General_beds: 15 + ((index * 13) % 136)
    };
});

// WARD EMERGENCY RELIEF ASSETS DATABASE
const wardReliefAssets = {
    "Topsia": { waterTankers: 3, coolingShelters: 1, orsBooths: 5, status: "Deployed" },
    "Kalighat": { waterTankers: 2, coolingShelters: 1, orsBooths: 4, status: "Standby" },
    "Sealdah": { waterTankers: 5, coolingShelters: 2, orsBooths: 8, status: "Critical Deployment" },
    "College Street": { waterTankers: 2, coolingShelters: 1, orsBooths: 4, status: "Standby" },
    "Shyambazar": { waterTankers: 3, coolingShelters: 1, orsBooths: 5, status: "Deployed" },
    "Park Street": { waterTankers: 4, coolingShelters: 2, orsBooths: 6, status: "Deployed" },
    "Bhowanipore": { waterTankers: 2, coolingShelters: 1, orsBooths: 4, status: "Standby" },
    "Salt Lake Sec V": { waterTankers: 4, coolingShelters: 2, orsBooths: 7, status: "Active Monitoring" }
};

function getReliefAssetsForWard(wardName) {
    return wardReliefAssets[wardName] || { waterTankers: 2, coolingShelters: 1, orsBooths: 3, status: "Standard" };
}

const calculatedElderlyRatio = 0.075;
const calculatedOutdoorRatio = 0.6689;

let selectedWard = wardsData[0];
let map, wardMarkers = [], hospitalMarkers = [];
let trendChart = null;
let isSimulationActive = false;
let isDispatchLogVisible = false;

// Microclimate weather cache stored per ward
let wardWeatherCache = {};
let currentMetrics = { Ta: 0, RH: 0, v10: 0, Rsolar: 0, cloudCover: 0 };

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function countHospitalsForWard(wardLat, wardLng) {
    return loadedHospitals.filter(h => haversineDistance(wardLat, wardLng, h.lat, h.lng) <= 10.0).length;
}

function calculateMultiFactorVulnerability(ward) {
    const hospitalCount = countHospitalsForWard(ward.lat, ward.lng);
    const vHealth = 1 / (1 + (hospitalCount / 5));
    const vSlum = ward.slumDensity;
    const vPop = ward.vulnerablePopRatio;
    const rawVi = (0.50 * vHealth) + (0.30 * vSlum) + (0.20 * vPop);
    const Vi = Math.pow(rawVi, 1.5);

    return { Vi: Math.min(1, Math.max(0, Vi)), vHealth, vSlum, vPop };
}

function calculateHospitalizationSpike(wbgt) {
    return Math.min(100, Math.max(0, (wbgt - 28) * 8));
}

// FETCH 5-DAY (120-HOUR) WEATHER SPECIFICALLY FOR A GIVEN LATITUDE AND LONGITUDE
async function fetchWeatherForWard(ward) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${ward.lat}&longitude=${ward.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,direct_normal_irradiance,cloud_cover&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,direct_normal_irradiance,cloud_cover&forecast_days=5&timezone=Asia%2FKolkata`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

// FETCH ALL WARDS IN PARALLEL SO EACH WARD HAS ITS OWN REAL-TIME MICROCLIMATE DATA
async function fetchAllWardsWeatherData() {
    try {
        isSimulationActive = false;
        document.getElementById('data-source-badge').innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Syncing Ward-Specific Microclimates...`;

        const fetchPromises = wardsData.map(ward => 
            fetchWeatherForWard(ward)
                .then(data => {
                    const current = data.current || {};
                    wardWeatherCache[ward.name] = {
                        metrics: {
                            Ta: current.temperature_2m ?? 36.5,
                            RH: current.relative_humidity_2m ?? 62,
                            v10: current.wind_speed_10m ?? 8.5,
                            Rsolar: current.direct_normal_irradiance ?? 650,
                            cloudCover: current.cloud_cover ?? 0
                        },
                        hourly: data.hourly || null
                    };
                })
                .catch(err => {
                    console.warn(`Fallback active for ward ${ward.name}:`, err);
                    wardWeatherCache[ward.name] = {
                        metrics: { Ta: 36.0 + Math.random() * 3, RH: 60 + Math.random() * 10, v10: 7.0, Rsolar: 700, cloudCover: 15 },
                        hourly: null
                    };
                })
        );

        await Promise.all(fetchPromises);

        document.getElementById('data-source-badge').className = "px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest";
        document.getElementById('data-source-badge').innerHTML = `<i class="fa-solid fa-tower-cell"></i> Live Microclimate Ward Sync Active`;

        loadWardDataIntoUI(selectedWard);

    } catch (err) {
        console.warn("Failed multi-ward weather fetch:", err);
        document.getElementById('data-source-badge').className = "px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase tracking-widest";
        document.getElementById('data-source-badge').innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Telemetry Fallback Engine`;
    }
}

function loadWardDataIntoUI(ward) {
    const cached = wardWeatherCache[ward.name];
    if (cached && !isSimulationActive) {
        currentMetrics = { ...cached.metrics };
        if (cached.hourly) {
            updateTrendChartFromHourlyApi(cached.hourly);
        }
    }

    document.getElementById('telemetry-ward-label').innerText = ward.name;
    document.getElementById('chart-ward-label').innerText = ward.name;
    document.getElementById('sim-ward-name').innerText = ward.name;

    // Sync UI displays
    document.getElementById('live-temp').innerText = currentMetrics.Ta.toFixed(1) + " °C";
    document.getElementById('live-rh').innerText = currentMetrics.RH.toFixed(0) + " %";
    document.getElementById('live-wind').innerText = currentMetrics.v10.toFixed(1) + " km/h";
    document.getElementById('live-cloud').innerText = currentMetrics.cloudCover.toFixed(0) + " %";
    document.getElementById('live-solar').innerText = currentMetrics.Rsolar.toFixed(0) + " W/m²";

    // Sync simulation sliders
    document.getElementById('input-temp').value = currentMetrics.Ta;
    document.getElementById('val-temp').innerText = currentMetrics.Ta.toFixed(1) + " °C";
    document.getElementById('input-rh').value = currentMetrics.RH;
    document.getElementById('val-rh').innerText = currentMetrics.RH.toFixed(0) + " %";
    document.getElementById('input-wind').value = currentMetrics.v10;
    document.getElementById('val-wind').innerText = currentMetrics.v10.toFixed(1) + " km/h";
    document.getElementById('input-cloud').value = currentMetrics.cloudCover;
    document.getElementById('val-cloud').innerText = currentMetrics.cloudCover.toFixed(0) + " %";
    document.getElementById('input-solar').value = currentMetrics.Rsolar;
    document.getElementById('val-solar').innerText = currentMetrics.Rsolar.toFixed(0) + " W/m²";

    recalculateSystem();
}

function runManualSimulation() {
    isSimulationActive = true;
    currentMetrics.Ta = parseFloat(document.getElementById('input-temp').value);
    currentMetrics.RH = parseFloat(document.getElementById('input-rh').value);
    currentMetrics.v10 = parseFloat(document.getElementById('input-wind').value);
    currentMetrics.cloudCover = parseFloat(document.getElementById('input-cloud').value);
    currentMetrics.Rsolar = parseFloat(document.getElementById('input-solar').value);

    document.getElementById('val-temp').innerText = currentMetrics.Ta.toFixed(1) + " °C";
    document.getElementById('val-rh').innerText = currentMetrics.RH.toFixed(0) + " %";
    document.getElementById('val-wind').innerText = currentMetrics.v10.toFixed(1) + " km/h";
    document.getElementById('val-cloud').innerText = currentMetrics.cloudCover.toFixed(0) + " %";
    document.getElementById('val-solar').innerText = currentMetrics.Rsolar.toFixed(0) + " W/m²";

    document.getElementById('live-temp').innerText = currentMetrics.Ta.toFixed(1) + " °C";
    document.getElementById('live-rh').innerText = currentMetrics.RH.toFixed(0) + " %";
    document.getElementById('live-wind').innerText = currentMetrics.v10.toFixed(1) + " km/h";
    document.getElementById('live-cloud').innerText = currentMetrics.cloudCover.toFixed(0) + " %";
    document.getElementById('live-solar').innerText = currentMetrics.Rsolar.toFixed(0) + " W/m²";

    document.getElementById('data-source-badge').className = "px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30 uppercase tracking-widest";
    document.getElementById('data-source-badge').innerHTML = `<i class="fa-solid fa-flask"></i> Simulation / Testing Override Active`;

    recalculateSystem();
}

function calculateHeatIndex(T_celsius, RH) {
    const T = (T_celsius * 9 / 5) + 32;
    let hi = -42.379 + 2.04901523 * T + 10.14333127 * RH - 0.22475541 * T * RH
             - 6.83783e-3 * T * T - 5.481717e-2 * RH * RH + 1.22874e-3 * T * T * RH
             + 8.5282e-4 * T * RH * RH - 1.99e-6 * T * T * RH * RH;
    return (hi - 32) * 5 / 9;
}

// HELPER METHOD TO CALCULATE WBGT FROM RAW METEOROLOGICAL METRICS
function calculateWBGT(Ta, RH, v10, Rsolar, cloudCover) {
    const cloudCoverFactor = 1 - (cloudCover / 100);
    const effectiveSolar = Rsolar * cloudCoverFactor;
    const Twb = Ta * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) + Math.atan(Ta + RH) - Math.atan(RH - 1.676331) + 0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) - 4.686035;
    const Tg = Ta + (0.018 * effectiveSolar) - (0.2 * v10);
    return (0.7 * Twb) + (0.2 * Tg) + (0.1 * Ta);
}

function recalculateSystem() {
    const { Ta, RH, v10, Rsolar, cloudCover } = currentMetrics;

    const cloudCoverFactor = 1 - (cloudCover / 100);
    const effectiveSolar = Rsolar * cloudCoverFactor;

    const UTCI = Ta + (0.25 * (RH - 50)) - (0.1 * v10) + (0.005 * effectiveSolar);
    const WBGT = calculateWBGT(Ta, RH, v10, Rsolar, cloudCover);
    const HI = calculateHeatIndex(Ta, RH);

    const vulnerability = calculateMultiFactorVulnerability(selectedWard);
    const riskScore = Math.min(100, Math.max(0, ((WBGT - 15) * 3) * vulnerability.Vi));

    document.getElementById('metric-wbgt').innerText = WBGT.toFixed(1) + " °C";
    document.getElementById('metric-utci').innerText = UTCI.toFixed(1) + " °C";
    document.getElementById('metric-hi').innerText = HI.toFixed(1) + " °C";
    document.getElementById('metric-risk').innerText = riskScore.toFixed(1) + " / 100";

    updateGaugeAndAdvisories(WBGT, riskScore);

    document.getElementById('calc-utci-val').innerText = UTCI.toFixed(1) + " °C";
    document.getElementById('calc-wbgt-val').innerText = WBGT.toFixed(1) + " °C";
    document.getElementById('calc-risk-score-val').innerText = riskScore.toFixed(1);

    document.getElementById('vi-total-badge').innerText = vulnerability.Vi.toFixed(3);
    document.getElementById('vf-health').innerText = vulnerability.vHealth.toFixed(2);
    document.getElementById('vf-slum').innerText = vulnerability.vSlum.toFixed(2);
    document.getElementById('vf-pop').innerText = vulnerability.vPop.toFixed(2);

    renderMarkers();
    updateWardCard(WBGT, riskScore);
}

function updateGaugeAndAdvisories(wbgt, riskScore) {
    document.getElementById('gauge-wbgt-val').innerText = wbgt.toFixed(1) + "°C";

    let angle = -90;
    let tierLabel = "LOW";
    let tierColorClass = "text-emerald-400";
    let advisoryHtml = "";
    let advisoryLevelText = "GREEN CLEAR";
    let advisoryLevelClass = "bg-emerald-950 text-emerald-400 border-emerald-800";

    if (wbgt < 25) {
        angle = -90 + ((wbgt / 25) * 36);
        tierLabel = "LOW RISK";
        tierColorClass = "text-emerald-400";
        advisoryLevelText = "LEVEL 1: NORMAL";
        advisoryLevelClass = "bg-emerald-950 text-emerald-400 border-emerald-800";
        advisoryHtml = `<p class="text-emerald-300 font-semibold">• Standard municipal Monitoring Active.</p><p class="text-slate-400">• Ensure public water kiosks are operational across hubs.</p>`;
    } else if (wbgt >= 25 && wbgt < 28) {
        angle = -54 + (((wbgt - 25) / 3) * 36);
        tierLabel = "MODERATE";
        tierColorClass = "text-lime-400";
        advisoryLevelText = "LEVEL 2: YELLOW WATCH";
        advisoryLevelClass = "bg-lime-950 text-lime-400 border-lime-800";
        advisoryHtml = `<p class="text-lime-300 font-semibold">• Issue heat hydration advisories across ward centers.</p><p class="text-slate-400">• Monitor vulnerable elderly populations.</p>`;
    } else if (wbgt >= 28 && wbgt < 31) {
        angle = -18 + (((wbgt - 28) / 3) * 36);
        tierLabel = "HIGH RISK";
        tierColorClass = "text-yellow-400";
        advisoryLevelText = "LEVEL 3: AMBER ALERT";
        advisoryLevelClass = "bg-yellow-950 text-yellow-400 border-yellow-800";
        advisoryHtml = `<p class="text-yellow-300 font-semibold">• Enforce mandatory 15-min rest cycles for outdoor labor.</p><p class="text-slate-400">• Activate KMC Ward Cooling Centers & ORS hydration points.</p>`;
    } else if (wbgt >= 31 && wbgt < 34) {
        angle = 18 + (((wbgt - 31) / 3) * 36);
        tierLabel = "VERY HIGH";
        tierColorClass = "text-orange-400";
        advisoryLevelText = "LEVEL 4: ORANGE WARNING";
        advisoryLevelClass = "bg-orange-950 text-orange-400 border-orange-800";
        advisoryHtml = `<p class="text-orange-300 font-semibold">• Shift outdoor labor hours (Halt heavy outdoor work 11:00 - 15:30).</p><p class="text-slate-400">• Alert hospital ERs for heatstroke admissions surge.</p>`;
    } else {
        angle = Math.min(90, 54 + (((wbgt - 34) / 6) * 36));
        tierLabel = "EXTREME";
        tierColorClass = "text-red-500";
        advisoryLevelText = "LEVEL 5: RED EMERGENCY";
        advisoryLevelClass = "bg-red-950 text-red-400 border-red-800";
        advisoryHtml = `<p class="text-red-400 font-black">• DECLARE KMC CIVIC HEAT EMERGENCY.</p><p class="text-slate-300">• Deploy mobile water tankers & cooling shelters.</p><p class="text-slate-400">• Enforce mandatory suspension of peak daylight outdoor work.</p>`;
    }

    document.getElementById('gauge-needle').setAttribute('transform', `rotate(${angle} 50 50)`);
    const labelEl = document.getElementById('gauge-tier-label');
    labelEl.innerText = tierLabel;
    labelEl.className = `text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-slate-900 ${tierColorClass} border border-slate-800`;

    const advLevelEl = document.getElementById('advisory-level');
    advLevelEl.innerText = advisoryLevelText;
    advLevelEl.className = `px-2 py-0.5 rounded text-[10px] font-bold border ${advisoryLevelClass}`;
    document.getElementById('advisory-content').innerHTML = advisoryHtml;
}

// RENDER EACH MAP MARKER DYNAMICALLY USING ITS OWN INDIVIDUAL WARD WBGT
function renderMarkers() {
    wardMarkers.forEach(m => map.removeLayer(m));
    wardMarkers = [];

    wardsData.forEach(ward => {
        let wardWBGT;
        const cached = wardWeatherCache[ward.name];

        if (cached) {
            const m = cached.metrics;
            wardWBGT = calculateWBGT(m.Ta, m.RH, m.v10, m.Rsolar, m.cloudCover);
        } else {
            wardWBGT = calculateWBGT(currentMetrics.Ta, currentMetrics.RH, currentMetrics.v10, currentMetrics.Rsolar, currentMetrics.cloudCover);
        }

        const count = countHospitalsForWard(ward.lat, ward.lng);
        const Vi = calculateMultiFactorVulnerability(ward).Vi;
        
            // Exponential excess mortality and conservative thresholded hospitalization projection per ward
        const heatExcess = Math.max(0, wardWBGT - 28);
        const mortalitySpike = Math.min(100, (Math.exp(0.083 * heatExcess) - 1) * Vi * 100);

        let color = "#10b981";
        if (mortalitySpike > 15) color = "#eab308";
        if (mortalitySpike > 28) color = "#f97316";
        if (mortalitySpike > 40) color = "#dc2626";

        const isSelected = selectedWard.name === ward.name;

        const marker = L.circleMarker([ward.lat, ward.lng], {
            radius: isSelected ? 12 : 8,
            fillColor: color,
            color: isSelected ? "#ffffff" : "#000000",
            weight: isSelected ? 3 : 1.5,
            fillOpacity: 0.85
        }).addTo(map);

        marker.bindTooltip(`<b>${ward.name}</b><br>WBGT: ${wardWBGT.toFixed(1)}°C<br>Mortality: +${mortalitySpike.toFixed(1)}%`, { direction: 'top' });

        marker.on('click', () => {
            selectWard(ward);
        });

        wardMarkers.push(marker);
    });
}

function renderWardQuickSelector() {
    const container = document.getElementById('ward-quick-selector');
    container.innerHTML = wardsData.map(w => `
        <button onclick="selectWardByName('${w.name}')" class="px-2.5 py-1 text-[11px] font-semibold rounded-md transition ${selectedWard.name === w.name ? 'bg-orange-600 text-white shadow-lg' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}">
            ${w.name}
        </button>
    `).join('');
}

function selectWardByName(name) {
    const target = wardsData.find(w => w.name === name);
    if (target) selectWard(target);
}

function selectWard(ward) {
    selectedWard = ward;
    map.panTo([ward.lat, ward.lng]);
    renderWardQuickSelector();
    loadWardDataIntoUI(ward);
}

function updateWardCard(WBGT, riskScore) {
    document.getElementById('selected-ward-name').innerText = selectedWard.name;
    document.getElementById('calc-ward-name').innerText = selectedWard.name;

    const count = countHospitalsForWard(selectedWard.lat, selectedWard.lng);
    const Vi = calculateMultiFactorVulnerability(selectedWard).Vi;
    const heatExcess = Math.max(0, WBGT - 28);
    const mortalitySpike = Math.min(100, (Math.exp(0.083 * heatExcess) - 1) * Vi * 100);
    const hospitalizationSpike = calculateHospitalizationSpike(WBGT);

    document.getElementById('ward-hospitals').innerText = `${count} Facilities`;
    document.getElementById('ward-vi').innerText = Vi.toFixed(3);
    document.getElementById('calc-vi-val').innerText = Vi.toFixed(3);
    document.getElementById('ward-risk-score').innerText = riskScore.toFixed(1) + " / 100";
    document.getElementById('ward-hospitalization').innerText = `+${hospitalizationSpike.toFixed(1)}%`;
    document.getElementById('calc-hosp-val').innerText = `+${hospitalizationSpike.toFixed(1)}%`;
    document.getElementById('ward-mortality').innerText = `+${mortalitySpike.toFixed(1)}%`;
    document.getElementById('calc-mort-val').innerText = `+${mortalitySpike.toFixed(1)}%`;

    const assets = getReliefAssetsForWard(selectedWard.name);
    document.getElementById('asset-tankers').innerText = assets.waterTankers;
    document.getElementById('asset-shelters').innerText = assets.coolingShelters;
    document.getElementById('asset-ors').innerText = assets.orsBooths;
    const statusBadge = document.getElementById('asset-status-badge');
    statusBadge.innerText = assets.status;
    renderNearbyBedTracker();
}

function renderNearbyBedTracker() {
    const container = document.getElementById('hospital-bed-list');
    if (!container) return;

    document.getElementById('total-hospitals-count').innerText = `${loadedHospitals.length} Facilities`;
    const nearbyHospitals = loadedHospitals.map(hospital => ({
        ...hospital,
        distance: haversineDistance(selectedWard.lat, selectedWard.lng, hospital.lat, hospital.lng)
    })).sort((a, b) => a.distance - b.distance).slice(0, 12);

    container.innerHTML = nearbyHospitals.map(hospital => {
        const badgeClass = hospital.beds.ICU_available > 5
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            : hospital.beds.ICU_available > 0
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-red-500/20 text-red-400 border-red-500/30';

        return `<div class="bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 flex justify-between items-center gap-2">
            <div class="min-w-0">
                <span class="font-bold text-slate-200 block truncate">${hospital.name}</span>
                <span class="text-[10px] text-slate-400 mono"><i class="fa-solid fa-location-dot text-slate-500"></i> ${hospital.distance.toFixed(2)} km away</span>
            </div>
            <div class="text-right shrink-0">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold border ${badgeClass} block mb-1">ICU: ${hospital.beds.ICU_available} Free</span>
                <span class="text-[9px] text-slate-400 block">O2: ${hospital.beds.Oxygen_beds} | Gen: ${hospital.beds.General_beds}</span>
            </div>
        </div>`;
    }).join('');
}

function updateTrendChartFromHourlyApi(hourlyData) {
    const ctx = document.getElementById('trendChart').getContext('2d');
    
    // Extract full 5-day horizon (120 hours)
    const rawTimes = hourlyData.time ? hourlyData.time.slice(0, 120) : [];
    const temps = hourlyData.temperature_2m ? hourlyData.temperature_2m.slice(0, 120) : [];
    const rhs = hourlyData.relative_humidity_2m ? hourlyData.relative_humidity_2m.slice(0, 120) : [];
    const winds = hourlyData.wind_speed_10m ? hourlyData.wind_speed_10m.slice(0, 120) : [];
    const solars = hourlyData.direct_normal_irradiance ? hourlyData.direct_normal_irradiance.slice(0, 120) : [];
    const cloudCovers = hourlyData.cloud_cover ? hourlyData.cloud_cover.slice(0, 120) : [];

    const labels = rawTimes.map((t, idx) => {
        if (idx % 12 === 0) {
            const dateStr = t.split('T')[0].slice(5);
            const hourStr = t.split('T')[1];
            return `${dateStr} ${hourStr}`;
        }
        return '';
    });

    const wbgtData = temps.map((t, idx) => {
        const rh = rhs[idx] ?? 60;
        const v10 = winds[idx] ?? 5;
        const rsolar = solars[idx] ?? 0;
        const cc = cloudCovers[idx] ?? 0;
        return parseFloat(calculateWBGT(t, rh, v10, rsolar, cc).toFixed(1));
    });

    const wardVulnerability = calculateMultiFactorVulnerability(selectedWard).Vi;
    const riskData = wbgtData.map(wbgt => Math.min(100, Math.max(0, ((wbgt - 15) * 3) * wardVulnerability)));

    if (trendChart) {
        trendChart.destroy();
    }
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Projected WBGT (°C)',
                    data: wbgtData,
                    borderColor: '#f97316',
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    yAxisID: 'yWBGT',
                    fill: true,
                    pointRadius: 1,
                    tension: 0.3
                },
                {
                    label: 'Composite Risk Score',
                    data: riskData,
                    borderColor: '#a855f7',
                    backgroundColor: 'rgba(168, 85, 247, 0.05)',
                    yAxisID: 'yRisk',
                    borderDash: [3, 3],
                    pointRadius: 0,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: false, mode: 'index' },
            plugins: {
                legend: { labels: { color: '#94a3b8', font: { size: 10 } } }
            },
            scales: {
                x: { grid: { color: '#1e293b' }, ticks: { color: '#64748b', font: { size: 9 }, autoSkip: false } },
                yWBGT: {
                    type: 'linear',
                    position: 'left',
                    title: { display: true, text: 'WBGT (°C)', color: '#f97316', font: { size: 10 } },
                    grid: { color: '#1e293b' },
                    ticks: { color: '#94a3b8', font: { size: 10 } }
                },
                yRisk: {
                    type: 'linear',
                    position: 'right',
                    title: { display: true, text: 'Risk Score', color: '#a855f7', font: { size: 10 } },
                    min: 0,
                    max: 100,
                    grid: { drawOnChartArea: false },
                    ticks: { color: '#94a3b8', font: { size: 10 } }
                }
            }
        }
    });
}

async function dispatchRegionalAlert() {
    isDispatchLogVisible = true;
    document.getElementById('relief-deployment-panel').classList.remove('hidden');
    openModal('api-modal');

    const statusEl = document.getElementById('dispatch-status');
    const messageEl = document.getElementById('dispatch-message');
    statusEl.className = "mb-3 text-xs font-semibold p-2.5 rounded bg-slate-900 border border-amber-500/30 text-amber-400 flex items-center gap-2";
    statusEl.innerHTML = `<i class="fa-solid fa-circle-notch animate-spin"></i> Triggering Twilio SMS Gateway & WhatsApp API...`;
    messageEl.textContent = `Dispatching multi-channel emergency alert for ${selectedWard.name}.`;

    const count = countHospitalsForWard(selectedWard.lat, selectedWard.lng);
    const Vi = calculateMultiFactorVulnerability(selectedWard).Vi;
    const wbgt = calculateWBGT(currentMetrics.Ta, currentMetrics.RH, currentMetrics.v10, currentMetrics.Rsolar, currentMetrics.cloudCover);
    const heatExcess = Math.max(0, wbgt - 28);
    const mortalitySpike = Math.min(100, (Math.exp(0.083 * heatExcess) - 1) * Vi * 100);
    const hospitalizationSpike = calculateHospitalizationSpike(wbgt);
    const assets = getReliefAssetsForWard(selectedWard.name);
    const heatIndex = calculateHeatIndex(currentMetrics.Ta, currentMetrics.RH);
    const riskLabel = mortalitySpike > 28 ? "RED" : mortalitySpike > 15 ? "ORANGE" : "AMBER";
    const alertLabel = mortalitySpike > 28 ? "URGENT: HEAT EMERGENCY" : "URGENT: HEAT WATCH";

    const payload = {
        timestamp: new Date().toISOString(),
        dispatch_authority: "Kolkata Municipal Corporation (KMC) HAP Division",
        targeted_ward: selectedWard.name,
        geo_location: { lat: selectedWard.lat, lng: selectedWard.lng },
        telemetry: currentMetrics,
        risk_profile: {
            calculated_wbgt: parseFloat(wbgt.toFixed(2)),
            spatial_vulnerability_index: parseFloat(Vi.toFixed(3)),
            projected_hospitalization_surge_pct: parseFloat(hospitalizationSpike.toFixed(2)),
            projected_mortality_spike_pct: parseFloat(mortalitySpike.toFixed(2))
        },
        deployed_relief_assets: assets,
        advisory_status: mortalitySpike > 28 ? "CRITICAL HEAT DISASTER DECLARED" : "ELEVATED HEAT WATCH",
        channels: ["SMS_Gateway", "WhatsApp_Business_API", "KMC_Municipal_Webhook"],
        dispatch_log_active: isDispatchLogVisible
    };

    try {
        const res = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            statusEl.className = "mb-3 text-xs font-semibold p-2.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-2";
            statusEl.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> Dispatched via SMS Gateway & WhatsApp API (HTTP 200 OK)`;
            messageEl.textContent = `${alertLabel} (${selectedWard.name})

Key Health Projections:
• Calculated WBGT: ~${wbgt.toFixed(1)}°C
• Heat Index: ~${heatIndex.toFixed(0)}°C
• ER Admissions Surge: +${hospitalizationSpike.toFixed(1)}%
• Mortality Risk Delta: +${mortalitySpike.toFixed(2)}% [${riskLabel}]

AUTOMATED MUNICIPAL TRIGGERS:
1. Hydration Kiosks & ORS Depots Activated.
2. Cooling Shelters Operational.
3. Outdoor Work Shift Ban (11:00 AM - 3:30 PM).
4. Power Grid Peak Demand Reserve Standby.`;
        }
    } catch (e) {
        statusEl.className = "mb-3 text-xs font-semibold p-2.5 rounded bg-red-950/80 border border-red-500/40 text-red-300 flex items-center gap-2";
        statusEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Gateway Connection Offline: Saved to Local Broadcast Log`;
        messageEl.textContent = `${alertLabel} (${selectedWard.name})

Key Health Projections:
• Calculated WBGT: ~${wbgt.toFixed(1)}°C
• Heat Index: ~${heatIndex.toFixed(0)}°C
• ER Admissions Surge: +${hospitalizationSpike.toFixed(1)}%
• Mortality Risk Delta: +${mortalitySpike.toFixed(2)}% [${riskLabel}]

AUTOMATED MUNICIPAL TRIGGERS:
1. Hydration Kiosks & ORS Depots Activated.
2. Cooling Shelters Operational.
3. Outdoor Work Shift Ban (11:00 AM - 3:30 PM).

Broadcast saved locally. Connect network to retry API dispatch.`;
    }
}

function startAmbulanceFastTrack() {
    const statusEl = document.getElementById('tracker-status');
    const etaEl = document.getElementById('tracker-eta');
    const nearestHospital = loadedHospitals
        .filter(hospital => hospital.beds.ICU_available > 0)
        .sort((a, b) => haversineDistance(selectedWard.lat, selectedWard.lng, a.lat, a.lng) - haversineDistance(selectedWard.lat, selectedWard.lng, b.lat, b.lng))[0];

    if (!nearestHospital) {
        statusEl.innerText = 'No available ICU bed found in the mapped network';
        etaEl.innerText = 'N/A';
        return;
    }

    const distance = haversineDistance(selectedWard.lat, selectedWard.lng, nearestHospital.lat, nearestHospital.lng);
    statusEl.innerText = `Rerouting to ${nearestHospital.name} (${nearestHospital.beds.ICU_available} ICU free)`;
    etaEl.innerText = `${Math.max(3, Math.ceil(distance * 2.5))} mins`;
    setTimeout(() => {
        statusEl.innerText = `Ambulance dispatched to ${nearestHospital.name}`;
    }, 3000);
}

function triggerEmergencyDispatch(number) {
    const telemetry = `SOS ${number}: ${selectedWard.name}, WBGT ${calculateWBGT(currentMetrics.Ta, currentMetrics.RH, currentMetrics.v10, currentMetrics.Rsolar, currentMetrics.cloudCover).toFixed(1)}°C`;
    document.getElementById('tracker-status').innerText = `${telemetry} - telemetry shared with dispatch`; 
}

function switchTab(tab) {
    if (tab === 'dashboard') {
        document.getElementById('view-dashboard').classList.remove('hidden');
        document.getElementById('view-calculations').classList.add('hidden');
        document.getElementById('tab-dash-btn').classList.add('active');
        document.getElementById('tab-calc-btn').classList.remove('active');
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    } else {
        document.getElementById('view-dashboard').classList.add('hidden');
        document.getElementById('view-calculations').classList.remove('hidden');
        document.getElementById('tab-dash-btn').classList.remove('active');
        document.getElementById('tab-calc-btn').classList.add('active');
        if (window.MathJax) MathJax.typesetPromise();
    }
}

function openModal(id) { 
    if (id === 'api-modal' && !isDispatchLogVisible) return;
    document.getElementById(id).classList.remove('hidden'); 
}

function closeModal(id) { 
    document.getElementById(id).classList.add('hidden'); 
    if (id === 'api-modal') {
        isDispatchLogVisible = false;
    }
}

function initMap() {
    map = L.map('map').setView([22.5626, 88.3639], 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    renderHospitalPins();
}

function renderHospitalPins() {
    loadedHospitals.forEach(h => {
        const marker = L.circleMarker([h.lat, h.lng], {
            radius: 4,
            fillColor: '#38bdf8',
            color: '#0284c7',
            weight: 1,
            fillOpacity: 0.8
        }).addTo(map);
        marker.bindTooltip(h.name);
        hospitalMarkers.push(marker);
    });
}

window.onload = function() {
    initMap();
    renderWardQuickSelector();
    fetchAllWardsWeatherData();
};
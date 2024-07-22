/*
Ez egy olyan memory game lesz, hogy megjelenítünk majd 2*2-östől kezdve mindig egyel növelve tehát utána jön a 3*3-as majd a 4*4-es 
mezőket és onnan ki kell találni ami más háttérszínt fog kapni egy ideig és utána visszamegy ugyanolyanra, mint a többi!! 
és az első körben amikor 2*2-es akkor 2-t kell majd kitalálni utána, amikor 3*3-as, akkor 3-t kell kitalálni és így tovább 
*/

function CallMemoryGame() {
    const [dimensions, setDimensions] = useState(4);
    /*
    const [dimensions, setDimensions] = useState({
        row: 2,
        col: 2
    })
    de mivel mindig ugyanannyi sor van, mint oszlop, ezért felesleges egy objektumban két értéket tárolni, elég lesz egy számnak!!! 
    */
    const [cells, setCells] = useState([]);
    /*
    Ehhez kell a generateCells függvény, ahol majd legeneráljuk a cell-eket és beletesszük egy tömbbe, amivel majd frissítjük a 
    cells useState-s változónkat!!! 
    */
    const generateCells = () => {
        const cs = [];

        // for(let i = 0; i < n; i++) {
        //     cs.push({
        //         nth: i,
        //         highlighted: false,
        //         div: <div className="box-light-grey table-border cursor-pointer"></div>  
        //     })
        // }
        /*
        bekérünk majd egy számot n és veégigmegyünk egy for-val n-ig, amihez majd létrehozunk egy objektumot mindegyiknél, amiben az nth
        kulcs megkapja az index-et és mindegyiknél lesz egy highlighted, ami lapból false és majd véletlenszerűen attól függ, hogy mekkora 
        a grid a highlighted majd true kell hogy legyen 
        3. meg egy olyan kulcs lesz, aminek megadjuk a div-et -> <div className="box-light-grey table-border cursor-pointer"></div>  
        de ezzel meg az lesz a probláma, hogy nehéz lesz majd a kijelelőlést megoldani, hogy ez a div kapjon egy extra highlighted class-t!!
        meg az nth se fontos, mert tudjuk majd a map-ból, hogy hányadik a cell-nek az index-e lesz!!! 
        tehát majd csak annyi kell, hogy true false és ez majd a highlighted-ra fog vontakozni
        -> 
        */
        // for(let i = 0; i < n; i++) 
        //cs.push(false);
        // setCells([...cells, false]);¨
        /*
        viszont ez a függvény nem kell, hogy bekérjen egy n-t, mert ez nekünk már meg van a dimension-ben, tehát addig kell, hogy menjen a for
        */
        //    for(let i = 0; i < dimensions; i++) {
        //     setCells([...cells, false]);
        //    }
        // de ez sem lesz jó, mert csak egy cells-et csinált, ezért kell az, hogy legyen egy üres const cs = []; tömb, amibe beletesszük!!! 
        /*
        és akkor jelenleg így néz ki ez a függvény 
        const generateCells = ()=> {
            const cs = [];
            
            for(let i = 0; i < dimensions; i++) {
                cs.push(false);
            }
    
            setCells(cs);
            és akkor itt vannak a celláink 
        }
        */
    }

    useEffect(() => {
        //generateCells(dimensions);
        generateCells();

    })
    /*
    és akkor így már végig tudunk menni egy map-val a cells-ne és nem az array-os dolog kell, ehelyett -> [...Array(dimensions).keys()].map(()=>
    -> 
    a map-ban amennyiben highlighted abban az esetben adja hozzá ezt a class-t, hogy bg-primary  
    cells.map((highlighted, i)=> 
        <div key={i} className={"box-light-grey table-border cursor-pointer " + (highlighted && "bg-primary")}></div> 
    )
    */
    const startGame = () => {
        const checkDuplicates = [];
        const cs = [];

        for (let i = 0; i < dimensions; i++)
            cs.push(false);

        while (checkDuplicates.length < Math.sqrt(dimensions)) {
            const randIndex = rNumber(0, dimensions - 1)

            if (!checkDuplicates.includes(randIndex)) {
                checkDuplicates.push(randIndex);

                cs[randIndex] = true;
            }
        }

        setCells(...cs); //leírás alul 
    }

    return (
        <div className="container-md text-center box-secondary p-lg">
            <h1>Memory Game</h1>

            <div className="grid-col-2 height-500 margin-x-auto">
                {
                    cells.map((highlighted, i) =>
                        <div style={highlighted ? {animationName: "highlighted-cell", animationDuration: "3s"} : {}}
                        key={i} className={"box-light-grey table-border cursor-pointer"}></div>
                    )
                }
            </div>

            <button onClick={startGame}
                className="input-md btn-primary">Start</button>
        </div>
    );
}

export default CallMemoryGame;

/*
Kell majd egy grid-rendszer, de az is kérdés lesz, hogy mennyi lesz majd a grid-ünk!!! 
de elöször kezdünk egy col-2-es-vel, meg az is kérdés, hogy mennyi element-et rakunk majd bele!! 
->
    <div className="grid-col-2">
        <div className="box-light-grey"></div>
        <div className="box-light-grey"></div>
        <div className="box-light-grey"></div>
        <div className="box-light-grey"></div>
    </div>

npm start-val megnéztük de még nem látszodik semmi, mert kell egy width-et meg height-ot is adni a grid-col-2-nek!!!! 
és fontos, hogy nem lehet meghatározni itt view-width-el, meg view-height-val a grid-nek a height-ját meg a width-jét hanem csak px-ben!!! 
nem lehet megadni max-height-ot meg max-width-et sem hanem csak simán height-ot meg width-et px-ben!!!!!!!!! 
->
    <div className="grid-col-2 height-500">
        <div className="box-light-grey"></div>
        <div className="box-light-grey"></div>
        <div className="box-light-grey"></div>
        <div className="box-light-grey"></div>
    </div>
megadtunk egy height 500px-t neki!!!! 

Most duplikálodnak a belső cella-border-ek, ezért majd kell egy osztály amit megakadályozza ezt a duplikációt!!! 
->
<div className="box-light-grey table-border"></div>
megadjuk minden div-nek azt a table-border class-t 
.table-border {
    margin-right: -1px;
    margin-top: -1px;
}
de itt mindegy, hogy top vagy bottom, mindegyikkel müködik!!! 

valahogy majd le kell generálni a div-eket, amik benne vannak a grid-rendszer-ben, meg azt is le kell majd generálni, hogy milyen grid legyen 
col-2 utána meg col-3... 

Létrehozunk egy dimension useState-s változót
const [dimension, setDimension] = useState(4);
ugye 4 az értéke, mert 2*2-esnél 4 darab div-et kell majd legenerálni ezzel!!!!

Az a baj, hogy itt nem tudunk for-ciklust használni a div-ek legenerálához, hanem csak kizárólag map-et, aminél ugye kell egy tömb!!!!! 
és így tudunk egy tömböt generálni!!! 
->
<div className="grid-col-2 height-500">
        {
            [...Array(dimensions).keys()].map(()=> )
        }
</div>

itt csináltunk egy Array-t, amennyinek annyi eleme van, mint a dimensions értéke!!!!! 
és ezen megyünk végig egy map-vel!!!! 
    <div className="grid-col-2 height-500">
        {
            [...Array(dimensions).keys()].map(()=> 
                <div className="box-light-grey table-border cursor-pointer"></div>    
            )
        }
    </div>

és akkor így legeneráltuk ugyanazt mint az elején, csak beletettük a div-eket, kell egy cursor-pointer, hogy lássuk, hogy mikor lesznek
kijelölve az egyes box-ok!!! 
******
Most az következik, hogy random fel kell villanjon jelen esetben 2*2-ben 2 box!!! 
Lesz egy cells nevű useState-s változó, ami egy tömb lesz és majd a generateCells-vel ezzel csinálunk cellákat
és beletesszük ebbe a tömbbe!!!!!! 
ha ez meg van csináltunk egy generateCells, ahol dimensions (4)-ig csináltunk egy for-t és egy üres tömböt is a for előtt 
és mindegyik körben a tömbbe beletettük azt, hogy false 
ezzel set-eltük a cells useState-st majd egy map-val végigmentünk rajta és megcsináltuk egy div-eket
->
cells.map((highlighted, i)=> 
    <div key={i} className={"box-light-grey table-border cursor-pointer " + (highlighted && "bg-primary")}></div> 
) 
ahol majd ha highlighted az true, akkor kap egy bg-primary class-t, de jelenleg csak false 
******
csinálunk egy button-t 
-> 
<button className="input-md btn-primary">Start</button>
de ez még nem középen lesz ezért csinálunk egy center-input-ot (inputs.scss) amit majd megadunk neki 
.center-input {
    display: block;
    margin: 10px auto;
}

de az egész container-ben lévő div nincsen középen, kap egy margin-x-auto-t a container meg kapott egy box-ot!!! 
-> 
<div className="container-md text-center box-secondary p-lg">
    <h1>Memory Game</h1>

<div className="grid-col-2 height-500 margin-x-auto"> 
********
ha most mindegyiket true-ra állítanánk a for ciklusban, akkor mindegyik megkapta volna a bg-primary class-t!! 

Ha rányomunk a start gombra, akkor véletlenszerűen kettő jelen esetben ki kell jelölnie, de akkor úgy, hogy a dimensions változónak a gyökjét 
kell, hogy kijelőlje!!!! 
erre csinálunk egy const startGame függvényt 
itt kettő véletlenszámot kell, hogy generáljunk, de úgy, hogy két különbözőt 

Csinálunk egy const checkDuplicates = [];
utána meg egy for-t fontos, hogy a Math.sqrt() square-root-val és az is, hogy itt meg legyen adva leki a dimensions!!!! 
-> 
for(let i = 0; i < Math.sqrt(dimensions); i++) {
    és akkor itt belül csinálunk egy véletlen számot -> const rNumber függvény!!! 
}

const rNumber = (from, to)=> Math.floor(Math.random() * ((to-from) + 1) + from);

az elöbbi for-ban pedig 0 és dimensions-1 között fogunk egyet generálni illetve kettőt 
->
for(let i = 0; i < Math.sqrt(dimensions); i++) {
    const rand = rNumber(0, dimensions - 1);
    itt belerakjuk a checkduplications-be 
    checkDuplicates.push(rand);
}

de a JavaScript set-be nem lehet két egyforma értéket megadni!! 

const checkDuplicate = new Set();

és amig a chechDuplications.size-ja az kisebb, mint a Math.sqrt(dimensions) addig generálunk le számokat 
most így néz ki a startGame, nem majd nem így lesz 

const startGame = ()=> {
    const randIndexes = new Set();

    while(randIndexes.size < Math.sqrt(dimensions)) {
        const rand = rNumber(0, dimensions - 1);
        randIndexes.push(rand);
    }
}

és nagyon fontos, hogy csak akkor rakjuk majd bele, hogyha nem includes
->
if(!Checkduplicates.includes(rand)) {
    checkDuplicats.push(rand)
}
->
const startGame = ()=> {
    const checkDuplicates = new Set();

    while(checkDuplicates.length < Math.sqrt(dimensions)) {
        const rand = rNumber(0, dimensions.length - 1);

        if(!checkduplicates.includes(rand)) {
        checkDuplicats.push(rand)
    }
}
Addig megy ez a while amig a checkDuplicates tömbbe az kisebb mint a Math.sqrt(dimensions), mert a dimension-ben vannak, hogy összesen 
hány div-et generálunk és ennek a gyöke kap majd egy highlighted class-t egy bizonyos ideig és majd arra kell rákattintani!!! 
és nagyon fontos, hogy csak azt a számot rakjuk (push-val minden körben) bele amit még nem tartalmaz a checkDuplicates tömb 

de nem fog müködni, mert hiába mondjuk, hogy setCells true itt belül valahogy így 
        if(!checkduplicates.includes(rand)) {
        checkDuplicats.push(rand)
        setCells(true);

ezért létrehozunk egy tömböt a while-on kivül, amiben kibontjuk a cells-t, hogy majd egyes elemeinek meg tudjuk adni, hogy true 
const cs = [...cells];

és rand-ot átírjuk randIndex-re és az lesz, hogy true!!!! 
cs[randIndex] = true;
így az egész 

const startGame = ()=> {
    const checkDuplicates = [];
    const cs = [...cells];
    
    while(checkDuplicates.length < Math.sqrt(dimensions)) {
        const randIndex = rNumber(0,  dimensions - 1)

        if(!checkDuplicates.includes(randIndex)) {
            checkDuplicates.push(randIndex);

            cs[randIndex] = true;
        }
    } 

    setCells(...cs); itt meg set-eljük a cs-vel a cells-t!!!!!!!!!!! 
}

és a végén megadjuk egy onClick-nek ezt a függvényt a button-nek amit csináltunk!!!! 

De nem jó, hogy kibontottuk a const cs = [...cells];
Nem szabad, hogy megkapja a cells-nek az értékeit!!! 
annyi false értéket kellene kapnia, amennyi a dimensions, ezért csinálunk egy for-t a dimensions-ra 
és belepusholunk annyi false-t amennyi a dimensions és a cs meg egy üres tömb az elején!!!! 

const cs = [];

for(let i = 0; i < dimensions; i++) 
    cs.push(false);

Utána meg ezekből a megfelelőeket kell majd megváltoztatni és amit csináltunk a while-ban!!!!! 
    const startGame = () => {
        const checkDuplicates = [];
        const cs = [];

        for (let i = 0; i < dimensions; i++)
            cs.push(false);

        while (checkDuplicates.length < Math.sqrt(dimensions)) {
            const randIndex = rNumber(0, dimensions - 1)

            if (!checkDuplicates.includes(randIndex)) {
                checkDuplicates.push(randIndex);

                cs[randIndex] = true;
            }
        }

        setCells(...cs); 
    }

És akkor most a 2*2-esen ki van jelölve kettő, de majd ezeket el kell tüntetni!!!! 
*********
Nem bg-primary-t fog kapni, hanem egy highlighted-cell class-t
<div key={i} className={"box-light-grey table-border cursor-pointer " + (highlighted && "bg-primary")}></div> 
->
<div key={i} className={"box-light-grey table-border cursor-pointer " + (highlighted && "highlighted-cell")}></div>
amire csinálnuk majd egy keyframes-t 

@keyframes highlight-cell {
    0% {background-color: map-get($colors, "primary");}
    99% {background-color: map-get($colors, "primary");}
    100% {background-color: transparent;}
}

azért csináltuk így a keyframes-et, mert ha simán from és to lett volna, akkor átment volna abból a színből a másikba 
most meg ugyanaz a szín 0-99%-ig és utána megy át transparent-be!!!! 

.highlighed-cell {
    animation-name: highlight-cell;
    animation-duration: 2s;
}

és ezzel a probléma, hogy itt ez azért nem lesz jó, mert ha többet kell majd megjegyezni, akkor hosszabb ideig kell majd fentmaradnia

de ez is megoldható egy style tag-vel, tehát ha változás van, akkor a style-tag-ben kell csinálni a dolgokat!!!!! 
<div style={highlighted ? {animationName: "highlighted-cell", animationDuration: "3s"} : {}}

tehát ha highlighted akkor megkapja az animationName-et meg a duration-t, ugyanolyan, mintha azt a class-t adtuk volna meg amit csináltunk 
és ez az animationDuration azt beállítottuk 3s-re, de ezt majd dinamikusan változni fog 
és akkor ez a class, ami hozzá van füzve már nem is kell nekünk, hogy highlighted!!! 
{"box-light-grey table-border cursor-pointer " + (highlighted && "bg-primary")}
->
    cells.map((highlighted, i) =>
        <div style={highlighted ? {animationName: "highlighted-cell", animationDuration: "3s"} : {}}
        key={i} className={"box-light-grey table-border cursor-pointer"}></div>
    )
*/
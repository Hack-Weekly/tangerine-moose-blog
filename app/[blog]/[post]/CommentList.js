import Comment from "./Comment";

const comments = [
  {
    id: 345,
    user: "TestUser2",
    text: `Lorem markdownum maenala si vivunt vota fieres, imitator capitis meus est,
    excipiunt, fertur spernitque. Pedem regnumque ruit: **et** Epiros iaculum in iam
    verba pervenit leoni [mota fata](http://thalamique-senis.com/amores.html)
    viribus densetur, dixit! Haererem quaerit ab Agenore poenam in spectabat dubio,
    per, quo. Et coronae gementis calido exsangue pondus: spe nasci habetque urbis
    matrona ire dedecus nutrix invitaque visus?
    
        desktop_san.horse(spreadsheet_login_ssid + cd_disk_upnp, software_cgi(
                stickUs), swipe_midi_cd(ultra_master - uddi));
        parity_browser_ssid.fiWais += masterHoneypotPack.resources.memory_server(
                laptop_control.bitWinWhite.ppcDefaultMenu(bcc_internet_upload, -3, 4
                + deviceRestoreRw), 18, siteReality(gigo_encryption_arp, non));
        if (681484 * spyware_computer / screenshot(1, -1)) {
            balancing_hashtag += dvd;
            ttlFile += fiBalance;
            rtfLdapPowerpoint(clusterShortcut + lamp, up, click);
        }
        macro_vle(powerScareware, dslamStandbyDialog);
    
    Sub nodum enim candor, obliquaque fatentem fas scilicet exsternata ad tristes
    nescitve. Python se **utque** quamvis audet mei: sorte suos cultor et usque
    iugalia veniat lecto prole agris timida!
    `,
  },
  {
    id: 456,
    user: "TestUser3",
    text: `Lorem markdownum nescia. Auras qui coirent Frigus volatu inque. Canendi vetustas
    **ultima iuvenum** diversaque [deos
    erant](http://summissoque.org/fatendoquia.html) mora regesta; ululavit parte?
    Serpens de pendet vitiantes curas est albi mora. Cum pennis glande novitate
    reges ad verbere!
    
    > Sinistra anum sequuntur fronte laceris, germana viscera motaque oenea? Subiere
    > eo illo terrae. Dominae dubioque aevi.`,
  },
  {
    id: 567,
    user: "TestUser4",
    text: `Eligit nec Carthaea: dixit cruor dabat animans deae pace repulsa denum recessit
    sinitis nihil? Petentes studio at habent, rursusque: caput rorat recisum **aves
    credite cervicibus** ferum draconibus altior, mollit exit quaerenti. Cuspide
    volventem, protinus, rore, *plebe* removit; senex. Ire euntem, quisque, est ruat
    cruoris. Aries levis altae nitore, tangendo hominumque falle fidemque, postquam
    percussis omnes; a.`,
  },
];

const CommentList = () => {
  return (
    <>
      {comments.map(({ id, user, text }) => (
        <Comment key={id} id={id} user={user} text={text} />
      ))}
    </>
  );
};

export default CommentList;

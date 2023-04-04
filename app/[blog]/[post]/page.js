"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Markdown from "marked-react";

import CommentList from "./CommentList";
import CommentEditor from "./components/CommentEditor";
import PostButtons from "./components/PostButtons";
import Reactions from "./components/Reactions";
import styles from "./page.module.css";

// mock data + api: ignore for now
const fetchMockData = (slug) => ({
  postId: 1234,
  authorUsername: "TestUser",
  slug: slug,
  updated: new Date(Date.now() - 60000),
  created: new Date(2023, 1, 1, 12, 12, 12),
  title: "Test Blog Post",
  text: `# Non durum magni sinit Scythides lapidem tu

  ## Verba sidus

  Lorem *markdownum regesta* est hoc purpureum inrita tribuere: a et illa a suos
  audacia. Sudantibus infecit est posse dea obvius quae nece lusisse frons illi
  voce detur ab pectora pectore, cui.

  1. Illam fac nec quae generis mihi tempora
  1. At utilis sequerere glandes totidemque coepit recanduit
  1. Quam fratribus densi
  1. Sed tuas primus pectora tellusque proceres nominis
  1. Solvit tibi fando sparsosque tela additur contigerant

  Utque Iovis ubi poplite hosti meumque postes mitto, protegat montibus parabat
  Penelopae ad! Aequora nostris praenuntia, quorum, cum ademit nidus, unde in,
  Camenis. Nunc Troiae, maculatum medio modo maior constitit pocula, praebentque
  falsi. Accedere tu fuit arreptum tegemus et pariterque nostra autem mihi Ulixem,
  cultis. Cretus aequora nectareis ante adhibet fulgura *ante* minus extremum
  tenus.

  ## Gravi fuerat saevit reddere huic aequor

  Non servat in quaerit neque. Innectere petunt frustra.

      midiOutput(modem_zero_rte, skin, storageDpi * footer(5, halfPlagiarismDevice));
      web_drop_networking.dnsDefragment = down + spoofingMatrix;
      truncate += 2;
      var interactive_ugc = threadingBurnMeta(torrent_text_definition);

  Non luget protinus sensit ignes: ullus *Sisyphe indutus*, dubites matrona nondum
  omnipotens manus, quare rursus timidas. Venerem quicumque idemque oppida
  sanguine, Pegason cultu, nunc admonuisse, ubi merito femina, solito inter;
  Orionis. Ferat mollesque nataque.
  * [relative test link](/blog/test-blog-post-2)
  * [absolute test link](https://vercel.com/)

  **Prolem manus**, nec in reminiscitur malum, hoc fors niveis. Est echidnis fera
  ille tenet te Peleus tenet dea lamentabile festaque digiti dictis? Est per
  ferrugine ipse, nata it dixi superi de praestantissima. Ferox procul mea tollere
  illis.`,
  reactions: { "👍": 2, "👎": 1, "👏": 1 },
});

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

const getAuthorName = (_id) => "Test User";
const useCurrentUser = () => ({ name: useSearchParams().get("user") }); // `?user=TestUser` in URL to test author view
const submitComment = (user, text) => comments.push({ id: text.length, user: user.name, text: text });
// mock end

const BlogPost = () => {
  const path = usePathname();
  var postSlug = path.match(/.*\/([-a-z0-9]+)/i)[1];
  const currentUser = useCurrentUser();
  const [data, setData] = useState(null);
  const [replying, setReplying] = useState(false);
  const handleCommentSubmit = (commentText) => {
    setReplying(false);
    submitComment(currentUser, commentText);
  };

  useEffect(() => {
    const data = fetchMockData(postSlug);
    setData(data);
  }, [postSlug]);

  if (!data) return <div>loading...</div>;
  if (data) {
    const { title, text, authorUsername, postSlug, created, updated, reactions } = data;
    const authorName = getAuthorName(authorUsername);
    const isAuthor = currentUser.name === authorUsername;

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.text}>
          <Markdown value={text} />
          <div className={styles.reacts}>
            <Reactions reactions={reactions} />
          </div>
        </div>
        <p>
          {`submitted ${created.toLocaleString()} (last edited ${updated.toLocaleString()}) by `}{" "}
          <a href={`/user/${authorUsername}`}>{authorName}</a>
        </p>
        <PostButtons
          postSlug={postSlug}
          isAuthor={isAuthor}
          replyCount={comments.length}
          onReply={() => setReplying(true)}
        />
        {replying && <CommentEditor onReplySubmit={handleCommentSubmit} />}
        <CommentList comments={comments} />
      </div>
    );
  }
};

export default BlogPost;

'use strict';
let page=1, stack=[], currentChallenge=0, selectedReflection=null;
const $=id=>document.getElementById(id), modalRoot=$('modalRoot');
const syllables=['ba','bi','bu','be','bo','ma','mi','mu','me','mo'];
const DEFAULT_COORDS={"5":[[27.8526,85.5981,20.7053,11.3551],[53.9368,85.1495,29.1474,11.9533]],"7":[[14.8263,20.214,15.5631,27.2355],[41.6526,21.7093,18.4895,24.2449],[70.6526,20.9617,17.3947,25.8897],[17.9684,54.257,17.0158,25.0925],[44.1895,55.3037,19.3737,24.3449],[71.6158,54.8551,18.6105,24.6439],[73.4,84.1,21.8,11.5]],"8":[[67.1895,68,25.9368,23.8131]],"9":[[28,34,46,37],[29,84.7944,42.1053,14.4486]],"10":[[27.8316,31.9065,45.6632,35.0561],[29,83,40.8421,13.2523]],"11":[[21.0421,83.1551,24.2053,12.1495],[48.6737,82.7065,31.2737,13.1963]],"12":[[18.4105,77.9664,24.0105,15.243],[52.0421,77.5177,30.8632,17.187]],"13":[[17.5053,77.6178,26.1053,15.5421],[51.6,76.571,31.8105,17.7851]],"14":[[23.8474,65.5729,6.6,8.2],[34.1842,65.2738,6.6,8.2],[47,65.4234,6.6,8.2],[56.1842,65.7224,6.6,8.2],[65.1632,65.4234,6.6,8.2],[89.3105,64.8252,6.6,8.2],[72.7368,64.1262,7.19999,10.0935],[80.5263,63.8271,6.77895,10.6916],[2.21579,84.7075,20.6684,10.4486],[72.9895,84.1093,24.8421,12.6916],[92.1474,0.906543,6.5,12]],"15":[[28.4736,51.5897,7.89474,8.55513],[53.9526,52.1879,8.48421,6.91028],[79.9263,51.7393,7.89473,7.35888],[38.3316,80.2963,8.48421,7.95701],[67.3632,81.0439,8.14737,7.20935],[82,87,16,11],[92.0632,2.5514,6.5,12]],"16":[[74.4789,29.5888,7.02106,8.20374],[74.4789,41.5421,7.4421,8.50281],[74.3105,53.5449,7.18948,7.90467],[74.5632,64.7991,6.68421,8.05422],[74.5631,76.2028,6.85264,7.90467],[2.4,87,21.1158,12.4439],[72.6684,87.4486,24.2526,10.9486],[92.4,3,6.5,12]],"17":[[40.2263,39.6,6.2421,7.45047],[40.1421,49.2037,6.41053,7.00187],[40.2263,58.4093,6.66316,6.85234],[40.3105,67.5645,6.49474,6.25422],[40.2263,76.2701,6.15789,6.85234],[67.6579,40.0486,6.41052,7.1514],[67.7421,49.0542,6.49474,6.70281],[67.8263,58.2598,6.41053,7.30092],[67.8263,66.9664,6.57895,6.85234],[67.9105,76.4196,6.83158,7.00187],[2,88,14.7684,9.10281],[76.3579,86.9533,21.4737,10.1495],[92.9053,0.757009,6.5,12]],"18":[[15.8526,83.8505,29.6421,12.4579],[49,84,35.0421,12.0093]],"19":[[18.6737,85.5421,27.8947,11.8131],[49.979,84.3458,31.9895,14.2056]],"20":[[41.8053,45.5019,17.6,16.5],[24.1316,66.8785,15.8105,14.8972],[43.6947,73.1589,15.9789,12.9533],[64.4263,66.8785,13.7053,12.9533],[2.1,84.7103,18.2211,12.243],[92.4,3,6.5,12]],"21":[[41.4947,78.1122,53,17]],"22":[[12.5579,76.1215,37.6211,16.1495],[54.4421,76.8692,35.6737,15.1028]],"23":[[41.5526,46.5486,17.6,16.5],[24.3,65.6823,15.4737,16.6916],[44.5368,70.3178,14.4632,17.2897],[64.5947,65.2336,14.0421,18.0374],[1.76316,84.7103,19.2316,12.5421],[92.4,3,6.5,12]],"24":[[40.4842,77.0654,53,17]],"25":[[12,77.1308,37.5053,15.0841],[55.0947,77.729,34.1368,14.7851],[90.2106,3.14954,7.42632,13.3458]],"26":[[41.6368,46.5486,17.6,16.5],[24.2158,66.1308,14.8,17.5888],[44.7895,71.3645,12.9474,16.3925],[63.9211,66.1308,14.1263,16.243],[1.93158,85.4579,18.7263,10.8972],[92.0632,1.50467,6.5,12]],"27":[[40.1474,78.1122,53,17]],"28":[[11.4105,77.1308,37.9263,14.0374],[54.5895,76.8318,35.0632,15.5327],[90.5474,3.89719,6.5,12]],"29":[[41.5526,46.6981,17.6,16.5],[23.5421,66.4299,16.0632,17.1402],[43.6947,70.6168,15.9789,17.1402],[63.9211,66.4299,14.5474,16.9907],[1.93158,85.9065,18.8948,10.8972],[92.4842,3.14953,6.5,12]],"30":[[13.5158,76.3832,35.8211,16.2804],[54.8421,76.5327,34.4737,15.9813],[89.9579,2.85047,7.42632,13.4953]],"31":[[40.5684,77.514,53,17]],"32":[[12.6105,83.1028,34.9684,12.4579],[49.8316,82.6542,36.0526,13.8037]],"33":[[13.6316,80.7103,33.8737,15.1495],[51.5053,80.8598,36.0526,14.7009]],"34":[[29.7053,70.3364,17.2526,21.1776],[53.4789,70.3365,16.4105,21.6262],[1.5,84.2617,21.2316,12.243],[92.0632,1.35513,6.5,12]],"35":[[30.9474,79.2991,42.6737,17.8037]],"36":[[32.4632,73.514,45.4421,19.4019]],"37":[[28.6947,70.785,19.3579,20.1308],[54.1526,70.1869,16.0737,20.8785],[1.5,84.2617,20.3895,11.6449],[92.6526,1.6542,6.5,12]],"38":[[33.0526,78,45.5895,18.9533]],"39":[[33.4,74.7103,44.2421,19.4019]],"40":[[29.6211,70.785,16.9158,21.4766],[54.0684,70.9346,16.3263,19.9813],[1.41579,83.514,20.8105,13.8878],[92.4842,1.95327,6.5,12]],"41":[[30.4316,77.8505,47.1158,18.6542]],"42":[[35.9158,73.0654,41.8,21.1963]],"43":[[22.1947,76.6729,25.5053,17.0374],[50.6158,76.5234,25.6316,16.2897]],"44":[[13.9368,80.5701,22.4,15.0374],[38.0053,80.5701,23.4842,13.5421],[63.5895,80.4206,22.5579,14.1402]],"45":[[65.2632,78.2617,31.4,14.6075]],"46":[[64.5053,78.2617,32.6632,15.2056]],"47":[[64.3684,80.1589,22.7053,14.2056]],"48":[[23.5684,81.7664,23.8421,15.3365],[52.1368,81.0187,23.7368,14.7383]],"49":[[24.6526,79.1729,24.6737,16.2336],[51.6316,79.1729,24.5053,14.4393]],"50":[[24.6,39.8972,15.8105,38.4579],[43.6737,38.7009,15.3895,39.5046],[63,39,15.8947,40.8505],[24.8632,81.3551,23.4211,15.7476],[51.5789,81.3551,24.5895,14.8505]],"51":[[23.5684,81.4206,23,14.3365],[49.8,82.0187,25.8,13.2897]],"52":[[32.0105,75.4206,35.2737,17.6822]]};

// Muzik latar asal KUVIA: kawalan manual, audio ducking untuk sebutan dan video.
const musicAudio=document.getElementById('kuviaMusic');
let musicEnabled=false, musicVolume=.25, musicDuck=false, musicVideo=false, musicFade=null, speechWatchdog=null;
function musicTarget(){return !musicEnabled||musicVideo?0:musicVolume*(musicDuck?.16:1)}
function fadeMusic(){
  if(musicFade)clearInterval(musicFade);
  const target=musicTarget();
  musicFade=setInterval(()=>{
    const diff=target-musicAudio.volume;
    if(Math.abs(diff)<.008){musicAudio.volume=target;clearInterval(musicFade);musicFade=null;return}
    musicAudio.volume=Math.max(0,Math.min(1,musicAudio.volume+Math.sign(diff)*Math.min(.018,Math.abs(diff))));
  },40);
}
function toggleMusic(){
  musicEnabled=!musicEnabled;
  const btn=document.getElementById('musicToggle');
  btn.textContent=musicEnabled?'♫ Jeda muzik':'♫ Main muzik';btn.setAttribute('aria-pressed',String(musicEnabled));
  if(musicEnabled){musicAudio.volume=0;musicAudio.play().then(fadeMusic).catch(()=>{musicEnabled=false;btn.textContent='♫ Main muzik';btn.setAttribute('aria-pressed','false')})}
  else {musicDuck=false;musicVideo=false;fadeMusic()}
}
function setMusicVolume(v){musicVolume=Math.max(0,Math.min(.5,Number(v)/100));fadeMusic()}
function duckMusic(on){musicDuck=Boolean(on);fadeMusic()}
function pauseMusicForVideo(on){musicVideo=Boolean(on);fadeMusic()}

const CONFIG={videoB:'https://www.youtube.com/embed/CBxJNk_pJOI',videoM:'https://www.youtube.com/embed/P_IwyEjFfrQ'};
function rect(x,y,w,h,fn,label){const scale=1; x+=w*(1-scale)/2; y+=h*(1-scale)/2; w*=scale; h*=scale; const b=document.createElement('button');b.className='hot';Object.assign(b.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});b.setAttribute('aria-label',label||'Buka');b.title=label||'';b.onclick=fn;
 const index=$('hotspots').children.length; b.dataset.index=index;
 try { const c=JSON.parse(localStorage.getItem('kuviaCoordsV7')||'{}'); const saved=(c[page]&&c[page][index])||(DEFAULT_COORDS[page]&&DEFAULT_COORDS[page][index]); if(saved){[x,y,w,h]=saved;Object.assign(b.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'})} } catch(e){}
 $('hotspots').appendChild(b)}
function link(x,y,w,h,target,label){rect(x,y,w,h,()=>go(target),label)}
function action(x,y,w,h,fn,label){rect(x,y,w,h,fn,label)}
function go(n){if(n<1||n>52)return;if(page!==n)stack.push(page);page=n;render();window.scrollTo({top:0,behavior:'smooth'})}
function historyBack(){if(stack.length){page=stack.pop();render()}else if(page!==1)go(7)}
function nextPage(){go(Math.min(52,page+1))}
function modal(html){modalRoot.innerHTML='<div class="overlay" role="dialog" aria-modal="true"><div class="panel">'+html+'</div></div>'}
function closeModal(){modalRoot.innerHTML='';pauseMusicForVideo(false)}
function speak(s){
 if(!('speechSynthesis'in window)){modal('<h2>Audio tidak tersedia</h2><p>Pelayar ini tidak menyokong bacaan suara. Minta guru membacakan suku kata.</p><button onclick="closeModal()">Tutup</button>');return}
 clearTimeout(speechWatchdog);speechSynthesis.cancel();
 let speechText=({'é':'é seperti ekor','e pepet':'emak','e taling':'ekor','me':'meja','be':'beca','mo':'moto','bo':'bola'})[s]||s;
 let u=new SpeechSynthesisUtterance(speechText);u.lang='ms-MY';u.rate=.92;u.pitch=1;
 let voices=speechSynthesis.getVoices(),v=voices.find(v=>v.lang.toLowerCase()==='ms-my')||voices.find(v=>v.lang.toLowerCase().startsWith('ms'));if(v)u.voice=v;
 duckMusic(true);
 const restore=()=>{clearTimeout(speechWatchdog);duckMusic(false)};
 u.onend=restore;u.onerror=restore;
 speechWatchdog=setTimeout(restore,12000);
 try{speechSynthesis.speak(u)}catch(e){restore()}
}
function showHelp(){modal('<h2>🧭 Panduan Laman Web</h2><p>Tekan butang berwarna pada grafik untuk meneruskan. Gerakkan tetikus atau gunakan kekunci Tab untuk menyerlahkan kawasan butang.</p><p>Aktiviti audio menggunakan suara peranti. Sebutan mungkin berbeza mengikut pelayar; guru perlu menyemaknya.</p><p>Video huruf B menggunakan pautan YouTube. Video huruf M telah dipautkan.</p><button onclick="closeModal()">Tutup</button>')}
function showVideo(letter){pauseMusicForVideo(true);let url=letter==='B'?CONFIG.videoB:CONFIG.videoM;modal('<h2>🎬 Belajar Suku Kata '+letter+'</h2>'+(url?'<iframe class="video" src="'+url+'" title="Video belajar suku kata '+letter+'" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>':'<p>Video huruf M belum dipautkan. Guru boleh menambah pautan YouTube dalam tetapan <code>CONFIG.videoM</code> pada fail <code>app.js</code>.</p>')+'<p class="hint">Sumber video: YouTube. Video memerlukan sambungan internet.</p><button onclick="closeModal()">Tutup video</button>')}
const challenges=[{p:20,options:['ba','bi','bu'],answer:'bi'},{p:23,options:['bo','be','ba'],answer:'be'},{p:26,options:['ma','mi','mu'],answer:'mi'},{p:29,options:['mo','me','ma'],answer:'me'}];
function challenge(i){currentChallenge=i;go(challenges[i].p)}
function pick(i,choice){let c=challenges[i];if(choice===c.answer){go([21,24,27,31][i])}else{go([22,25,28,30][i])}}
function retryChallenge(i){challenge(i)}
function showChecklist(){const stored=JSON.parse(localStorage.getItem('kuviaChecklist')||'{}');let rows=syllables.map((s,i)=>'<tr><td>'+(i+1)+'. '+s+'</td>'+['Tepat','Dengan bimbingan','Belum tepat'].map(v=>'<td><input type="radio" name="r'+i+'" value="'+v+'" '+(stored['r'+i]===v?'checked':'')+' aria-label="'+s+': '+v+'"></td>').join('')+'</tr>').join('');modal('<h2>📋 Senarai Semak Bacaan Guru</h2><p class="hint">Tandakan pilihan terus di laman web. Jawapan disimpan secara automatik pada peranti ini. Gunakan Cetak / Simpan PDF untuk salinan.</p><label>Nama Murid <input id="student" value="'+escapeHTML(stored.student||'')+'"></label> <label>Kelas <input id="className" value="'+escapeHTML(stored.className||'')+'"></label><table><thead><tr><th>Suku kata</th><th>Tepat</th><th>Dengan bimbingan</th><th>Belum tepat</th></tr></thead><tbody>'+rows+'</tbody></table><p>Ulasan Guru</p><textarea id="remarks" rows="2" style="width:100%">'+escapeHTML(stored.remarks||'')+'</textarea><p>Cadangan tindakan susulan</p><textarea id="followup" rows="2" style="width:100%">'+escapeHTML(stored.followup||'')+'</textarea><p><button onclick="saveChecklist()">💾 Simpan</button><button onclick="printChecklist()">🖨 Cetak / Simpan PDF</button><button onclick="closeModal()">Tutup</button></p>');document.querySelectorAll('#modalRoot input,#modalRoot textarea').forEach(el=>el.addEventListener('input',()=>{try{localStorage.setItem('kuviaChecklist',JSON.stringify(collectChecklist()))}catch(e){}}))}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function collectChecklist(){let data={student:$('student').value,className:$('className').value,remarks:$('remarks').value,followup:$('followup').value};syllables.forEach((s,i)=>{let v=document.querySelector('input[name="r'+i+'"]:checked');if(v)data['r'+i]=v.value});return data}
function saveChecklist(){localStorage.setItem('kuviaChecklist',JSON.stringify(collectChecklist()));alert('Senarai semak disimpan dalam pelayar ini.')}
function printChecklist(){let d=collectChecklist();localStorage.setItem('kuviaChecklist',JSON.stringify(d));let w=window.open('','_blank');if(!w){alert('Benarkan tetingkap pop-up untuk mencetak.');return}let t='<html><head><title>Senarai Semak KUVIA</title><style>body{font-family:Arial;padding:25px}td,th{border:1px solid #777;padding:8px}table{border-collapse:collapse;width:100%}</style></head><body><h1>KUVIA — Senarai Semak Bacaan</h1><p>Nama: '+escapeHTML(d.student)+' | Kelas: '+escapeHTML(d.className)+'</p><table><tr><th>Suku kata</th><th>Penilaian</th></tr>'+syllables.map((s,i)=>'<tr><td>'+s+'</td><td>'+escapeHTML(d['r'+i]||'Belum dinilai')+'</td></tr>').join('')+'</table><h3>Ulasan guru</h3><p>'+escapeHTML(d.remarks)+'</p><h3>Tindakan susulan</h3><p>'+escapeHTML(d.followup)+'</p></body></html>';w.document.write(t);w.document.close();w.focus();setTimeout(()=>w.print(),350)}
function reflection(v){selectedReflection=v;modal('<h2>🌟 Terima kasih!</h2><p>'+['Hebat! Teruskan membaca dengan yakin.','Bagus! Teruskan berlatih bersama guru.','Usaha yang baik! Kamu boleh mencuba lagi.'][v]+'</p><button onclick="closeModal();go(51)">Terus ke Penutup</button><button onclick="closeModal();go(13)">Berlatih Semula</button>')}
function render(){closeModal();$('slide').src='assets/'+String(page).padStart(2,'0')+'.jpg';$('slide').alt='KUVIA halaman '+page+' daripada 52';$('pageStatus').textContent='Halaman '+page+' / 52';$('hotspots').innerHTML='';
const L=(...a)=>link(...a),A=(...a)=>action(...a);
// Coordinates follow the visual PDF page, expressed as percentages.
// Individually mapped click zones, in percentages of the ORIGINAL 1037×584 artwork.
// Press Ctrl+Shift+H to show/hide clickable-zone outlines for alignment review.
if (correctedPage(page,L,A)) return;
switch(page){
case 1:L(15.4,64.5,13.6,17.1,2,'Objektif Pembelajaran');L(29.5,64.5,13.7,17.1,3,'Kriteria Kejayaan');L(43.8,64.5,13.6,17.1,4,'Panduan Guru');L(57.9,64.5,13.7,17.1,5,'Panduan Penggunaan');L(71.9,64.5,13.5,17.1,6,'Metadata');L(30.5,82.7,38.8,14.5,7,'Mula Pembelajaran');break;
case 5:L(10,85,33,13,1,'Kembali ke Halaman Utama');L(52,85,39,13,7,'Mula Pembelajaran');break;
case 7:[{x:8,y:30,n:8},{x:35,y:30,n:13},{x:69,y:30,n:19},{x:7,y:62,n:33},{x:37,y:62,n:44},{x:70,y:62,n:49}].forEach(o=>L(o.x,o.y,24,21,o.n,'Pergi ke kawasan '+o.n));L(71,83,28,16,8,'Mula');break;
case 8:L(65,68,32,28,9,'Buka Kerang');break;
case 9:A(28,34,46,37,()=>showVideo('B'),'Mainkan video B');L(29,83,48,14,10,'Teruskan');break;
case 10:A(28,34,46,37,()=>showVideo('M'),'Mainkan video M');L(29,83,48,14,11,'Teruskan');break;
case 11:L(13,83,28,15,10,'Kembali');L(47,83,42,15,12,'Teruskan');break;
case 12:L(17,83,29,15,7,'Kembali ke Peta');L(51,83,36,15,13,'Langkah 1');break;
case 13:L(13,82,30,16,7,'Peta');L(51,82,35,16,14,'Mula Misi');break;
case 14:[['b',26,69],['m',38,69],['a',50,69],['i',59,69],['u',68,69],['e',77,69],['o',89,69]].forEach(([s,x,y])=>A(x-4,y-5,8,10,()=>speak(s),'Dengar '+s));A(74,65,8,7,()=>speak('e'),'Dengar e pepet');A(82,65,8,7,()=>speak('é'),'Dengar e taling');L(0,84,26,16,13,'Kembali');L(72,84,28,16,15,'Seterusnya');break;
case 15:['ba','be','bi','bo','bu'].forEach((s,i)=>{let coords=[[24,54],[49,54],[74,54],[36,85],[62,85]][i];A(coords[0]-6,coords[1]-7,12,14,()=>speak(s),'Dengar '+s)});L(71,85,28,15,16,'Seterusnya');break;
case 16:['ma','me','mi','mo','mu'].forEach((s,i)=>A(72,27+i*12.6,12,10,()=>speak(s),'Dengar '+s));L(72,85,27,15,17,'Seterusnya');L(0,85,25,15,15,'Kembali');break;
case 17:['ba','bi','bu','be','bo'].forEach((s,i)=>A(37,40+i*10.8,10,8,()=>speak(s),'Semak audio '+s));['ma','mi','mu','me','mo'].forEach((s,i)=>A(66,40+i*10.8,10,8,()=>speak(s),'Semak audio '+s));L(74,85,26,15,18,'Seterusnya');L(0,85,22,15,16,'Kembali');break;
case 18:L(14,84,32,15,7,'Peta');L(49,84,39,15,19,'Langkah 2');break;
case 19:L(10,83,38,16,7,'Peta');L(52,83,41,16,20,'Mula Aktiviti');break;
case 20:case 23:case 26:case 29:{let i=[20,23,26,29].indexOf(page),c=challenges[i];A(38,43,26,23,()=>speak(c.answer),'Dengar bunyi suku kata');[17,48,77].forEach((x,j)=>A(x-13,64,26,25,()=>pick(i,c.options[j]),'Pilih '+c.options[j]));L(0,86,22,14,i===0?19:challenges[i-1].p,'Kembali');break}
case 21:case 24:case 27:case 31:L(42,82,53,17,page===31?32:[23,26,29][[21,24,27].indexOf(page)],'Cabaran seterusnya');break;
case 22:case 25:case 28:case 30:{let i=[22,25,28,30].indexOf(page);A(7,83,42,16,()=>speak(challenges[i].answer),'Dengar Semula');A(52,83,43,16,()=>retryChallenge(i),'Cuba Lagi');break}
case 32:L(10,84,38,15,7,'Peta');L(50,84,39,15,33,'Langkah 3');break;
case 33:L(9,84,38,15,7,'Peta');L(51,84,39,15,34,'Mula Misi');break;
case 34:A(28,75,25,22,()=>go(36),'Betul');A(55,75,24,22,()=>go(35),'Salah');L(1,85,22,14,7,'Peta');break;
case 35:L(28,79,50,19,37,'Soalan seterusnya');break;
case 36:L(28,78,51,20,34,'Cuba semula');break;
case 37:A(28,75,25,22,()=>go(38),'Betul');A(55,75,24,22,()=>go(39),'Salah');L(1,85,22,14,7,'Peta');break;
case 38:L(28,78,53,20,40,'Soalan seterusnya');break;
case 39:L(27,78,53,20,37,'Cuba semula');break;
case 40:A(28,75,25,22,()=>go(42),'Betul');A(55,75,24,22,()=>go(41),'Salah');L(1,85,22,14,7,'Peta');break;
case 41:L(29,78,52,20,43,'Selesai');break;
case 42:L(28,78,53,20,40,'Cuba semula');break;
case 43:L(9,83,37,16,7,'Peta');L(50,83,42,16,44,'Pentaksiran');break;
case 44:L(6,84,29,15,7,'Peta');L(37,84,30,15,45,'Mula Pentaksiran');L(68,84,29,15,47,'Senarai Semak');break;
case 45:L(64,82,33,17,46,'Seterusnya');break;
case 46:L(64,82,33,17,48,'Seterusnya');break;
case 47:A(61,83,35,16,()=>go(44),'Kembali ke Pentaksiran');setTimeout(()=>{if(page===47)showChecklist()},0);break;
case 48:L(10,83,37,16,7,'Peta');L(51,83,38,16,49,'Refleksi');break;
case 49:L(9,83,39,16,7,'Peta');L(52,83,38,16,50,'Mula Refleksi');break;
case 50:[20,48,76].forEach((x,i)=>A(x-13,39,26,41,()=>reflection(i),['Boleh baca sendiri','Boleh baca dengan bantuan','Mahu berlatih lagi'][i]));L(14,83,31,15,49,'Kembali');L(52,83,40,15,51,'Penutup');break;
case 51:L(10,84,35,15,7,'Peta');L(50,84,40,15,52,'Tamat Pengembaraan');break;
case 52:L(29,80,44,19,1,'Kembali ke Halaman Utama');break;
}
}

function correctedPage(p,L,A){
const B=(x,y,w,h,n,label)=>L(x,y,w,h,n,label);
const S=(x,y,w,h,txt,label)=>A(x,y,w,h,()=>speak(txt),label||('Dengar '+txt));
const home=()=>B(92.4,3,6.5,12,7,'Peta pembelajaran');
switch(p){
case 7:
 // Hit targets follow ONLY the coloured pill buttons on the actual artwork (1037 x 584).
 // Positions measured from user's screenshot, not broad illustration regions.
 [[15.5,40.7,12.7,6.6,8,'Set Induksi — Teluk Misteri'],
  [44.6,40.7,11.5,6.6,13,'Langkah 1 — Terumbu Suku Kata'],
  [73.6,40.7,11.5,6.6,19,'Langkah 2 — Laluan Mutiara'],
  [19.4,72.5,12.3,6.7,33,'Langkah 3 — Gua Detektif AI'],
  [46.8,72.5,12.3,6.7,44,'Pentaksiran — Istana Cabaran KV'],
  [73.3,72.5,14.4,6.7,49,'Refleksi dan Penutup']].forEach(q=>B(...q));
 B(73.4,84.1,21.8,11.5,8,'Mula Pengembaraan');return true;
case 11:B(41,84.8,12.5,12,10,'Kembali');B(56,84.8,21,12,12,'Teruskan Pengembaraan');return true;
case 12:B(43,83.2,15,13,7,'Kembali ke Peta');B(64,83.2,20,13,13,'Terus ke Langkah 1');return true;
case 13:B(41,83.3,16,13,7,'Kembali ke Peta');B(66,83.3,18,13,14,'Mula Misi');return true;
case 14:
 [['b',29,77],['m',39,77],['a',50.3,77],['i',59.4,77],['u',68.8,77],['o',90,77]].forEach(([t,x,y])=>S(x-3.3,y-4.1,6.6,8.2,t));
 S(77.2,72.5,5.6,8,'e pepet','Dengar e pepet');S(82.8,72.5,5.6,8,'e taling','Dengar e taling');
 B(2.3,87.1,12.5,10,13,'Kembali');B(82,87.1,16,10,15,'Seterusnya');home();return true;
case 15:
 [['ba',41.6,53.4],['be',64.3,53.4],['bi',86.4,53.4],['bo',52.3,84.2],['bu',75.1,84.2]].forEach(([t,x,y])=>S(x-4.2,y-5.1,8.4,10.2,t));
 B(82,87,16,11,16,'Seterusnya');home();return true;
case 16:
 [['ma',79,30.7],['me',79,43.7],['mi',79,56.6],['mo',79,69.2],['mu',79,81.8]].forEach(([t,x,y])=>S(x-4.1,y-4.7,8.2,9.4,t));
 B(2.4,87,13.2,10.5,15,'Kembali');B(82.1,87,16,10.5,17,'Seterusnya');home();return true;
case 17:
 [['ba',46,43.4],['bi',46,54.2],['bu',46,65.2],['be',46,76],['bo',46,86.5],['ma',73.6,43.4],['mi',73.6,54.2],['mu',73.6,65.2],['me',73.6,76],['mo',73.6,86.5]].forEach(([t,x,y])=>S(x-3.5,y-3.8,7,7.6,t));
 B(2,88,13,10,16,'Kembali');B(82,88,16,10,18,'Seterusnya');home();return true;
case 20:case 23:case 26:case 29:{
 const i=[20,23,26,29].indexOf(p),c=challenges[i];
 S(41.3,62.1,17.6,16.5,c.answer,'Dengar suku kata');
 [[28.5,83],[50,83],[72.5,83]].forEach(([x,y],j)=>A(x-9,y-7,18,14,()=>pick(i,c.options[j]),'Pilih '+c.options[j]));
 B(2.1,88,13,10,i===0?19:challenges[i-1].p,'Kembali');home();return true;}
case 25:case 28:case 30:{const i=[25,28,30].indexOf(p);A(28,87,21,10,()=>speak(challenges[i+1].answer),'Dengar semula');A(54,87,21,10,()=>retryChallenge(i+1),'Cuba lagi');home();return true;}
case 34:case 37:case 40:{let correct=p===34?36:p===37?38:42,wrong=p===34?35:p===37?39:41;
 A(26,82,17,14,()=>go(correct),'Betul');A(55.5,82,17,14,()=>go(wrong),'Salah');B(1.5,88,15,10,7,'Kembali ke Peta');home();return true;}
case 43:B(43.5,84,17,13,7,'Kembali ke Peta');B(63.5,84,21,13,44,'Terus ke Pentaksiran');return true;
case 44:B(36,87,16,11,7,'Kembali ke Peta');B(53.5,87,17,11,45,'Mula Pentaksiran');A(71,87,17,11,showChecklist,'Senarai Semak Guru');return true;
case 48:B(41,87,15,11,7,'Kembali ke Peta');B(63,87,17,11,49,'Terus ke Refleksi');return true;
case 49:B(42,86.5,16,11,7,'Kembali ke Peta');B(63,86.5,16,11,50,'Mula Refleksi');return true;
case 51:B(41,88,15,10,7,'Kembali ke Peta');B(61,88,21,10,52,'Tamat Pengembaraan');return true;
case 52:B(39,82,25,12,1,'Kembali ke Halaman Utama');return true;
}
return false;
}

window.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if(e.ctrlKey&&e.shiftKey&&e.key.toLowerCase()==='h'){document.body.classList.toggle('debug-hotspots');e.preventDefault()}if(e.key==='ArrowRight'&&!modalRoot.innerHTML)nextPage()});render();

// Visual calibration: edit actual clickable rectangles, not the artwork.
let editMode=false, dragState=null;
function toggleEdit(){editMode=!editMode;document.body.classList.toggle('edit-mode',editMode);document.getElementById('editBtn').textContent=editMode?'✓ Selesai laras':'✥ Laras butang';document.getElementById('editHint').hidden=!editMode;}
function saveCoords(){let all={};try{all=JSON.parse(localStorage.getItem('kuviaCoordsV7')||'{}')}catch(e){};all[page]=[...document.querySelectorAll('#hotspots .hot')].map(b=>[parseFloat(b.style.left),parseFloat(b.style.top),parseFloat(b.style.width),parseFloat(b.style.height)]);localStorage.setItem('kuviaCoordsV7',JSON.stringify(all));}
function resetCoords(){if(!confirm('Pulihkan kedudukan butang yang telah disahkan pada halaman '+page+'?'))return;let all={};try{all=JSON.parse(localStorage.getItem('kuviaCoordsV7')||'{}')}catch(e){};delete all[page];localStorage.setItem('kuviaCoordsV7',JSON.stringify(all));render();}
function exportCoords(){let data=localStorage.getItem('kuviaCoordsV7')||'{}';let blob=new Blob([data],{type:'application/json'});let url=URL.createObjectURL(blob);let a=document.createElement('a');a.href=url;a.download='KUVIA_Kedudukan_Butang.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
document.getElementById('hotspots').addEventListener('pointerdown',e=>{if(!editMode)return;let b=e.target.closest('.hot');if(!b)return;e.preventDefault();let r=document.getElementById('frame').getBoundingClientRect();let br=b.getBoundingClientRect();let edge=(e.clientX>br.right-22&&e.clientY>br.bottom-22);dragState={b,x:e.clientX,y:e.clientY,rect:[parseFloat(b.style.left),parseFloat(b.style.top),parseFloat(b.style.width),parseFloat(b.style.height)],fw:r.width,fh:r.height,edge};b.setPointerCapture(e.pointerId);});
document.getElementById('hotspots').addEventListener('pointermove',e=>{if(!dragState)return;let d=dragState,dx=100*(e.clientX-d.x)/d.fw,dy=100*(e.clientY-d.y)/d.fh;let [x,y,w,h]=d.rect;if(d.edge){w=Math.max(2,Math.min(100-x,w+dx));h=Math.max(2,Math.min(100-y,h+dy))}else{x=Math.max(0,Math.min(100-w,x+dx));y=Math.max(0,Math.min(100-h,y+dy))}Object.assign(d.b.style,{left:x+'%',top:y+'%',width:w+'%',height:h+'%'});});
document.getElementById('hotspots').addEventListener('pointerup',()=>{if(dragState){saveCoords();dragState=null}});
document.getElementById('hotspots').addEventListener('click',e=>{if(editMode){e.preventDefault();e.stopPropagation()}},true);

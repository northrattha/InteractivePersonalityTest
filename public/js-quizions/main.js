//Add Statistics
var config = {
    apiKey: "AIzaSyCDTE8ReNzdsRLnosqtjlj6JhBP4euslFY",
    authDomain: "interactive-personality-test.firebaseapp.com",
    databaseURL: "https://interactive-personality-test.firebaseio.com",
    projectId: "interactive-personality-test",
    storageBucket: "interactive-personality-test.appspot.com"
};
firebase.initializeApp(config);

$(function() {
    $("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        onStepChanging: function(event, currentIndex, newIndex) {
            if (newIndex != 0 && (!(document.getElementById('A' + ((newIndex * 3) - 2)).checked || document.getElementById('B' + ((newIndex * 3) - 2)).checked))) {
                document.getElementById("warn").innerHTML = `
                <div class="alert alert-danger alert-white rounded">
                    <strong>Oops!</strong> Please answer all questions!
                </div>`;
                return false;
            } else if (newIndex != 0 && (!(document.getElementById('A' + ((newIndex * 3) - 1)).checked || document.getElementById('B' + ((newIndex * 3) - 1)).checked))) {
                document.getElementById("warn").innerHTML = `
                <div class="alert alert-danger alert-white rounded">
                    <strong>Oops!</strong> Please answer all questions!
                </div>`;
                return false;
            } else if (newIndex != 0 && (!(document.getElementById('A' + (newIndex * 3)).checked || document.getElementById('B' + (newIndex * 3)).checked))) {
                document.getElementById("warn").innerHTML = `
                <div class="alert alert-danger alert-white rounded">
                    <strong>Oops!</strong> Please answer all questions!
                </div>`;
                return false;
            } else {
                document.getElementById("warn").innerHTML = "";
                if (newIndex === 1) {
                    $('.wizard > .steps ul').addClass('step-2');
                } else {
                    $('.wizard > .steps ul').removeClass('step-2');
                }
                if (newIndex === 2) {
                    $('.wizard > .steps ul').addClass('step-3');
                } else {
                    $('.wizard > .steps ul').removeClass('step-3');
                }
                if (newIndex === 3) {
                    $('.wizard > .steps ul').addClass('step-4');
                } else {
                    $('.wizard > .steps ul').removeClass('step-4');
                }
                if (newIndex === 4) {
                    $('.wizard > .steps ul').addClass('step-5');
                } else {
                    $('.wizard > .steps ul').removeClass('step-5');
                }
                if (newIndex === 5) {
                    $('.wizard > .steps ul').addClass('step-6');
                } else {
                    $('.wizard > .steps ul').removeClass('step-6');
                }
                if (newIndex === 6) {
                    $('.wizard > .steps ul').addClass('step-7');
                } else {
                    $('.wizard > .steps ul').removeClass('step-7');
                }
                return true;
            }
        },
        onFinishing: function(event, currentIndex) {
            return true;
        },
        onFinished: function(event, currentIndex) {
            if (!(document.getElementById('A19').checked || document.getElementById('B19').checked)) {
                document.getElementById("warn").innerHTML = `
                <div class="alert alert-danger alert-white rounded">
                    <strong>Oops!</strong> Please answer all questions!
                </div>`;
                return false;
            } else if (!(document.getElementById('A20').checked || document.getElementById('B20').checked)) {
                document.getElementById("warn").innerHTML = `
                <div class="alert alert-danger alert-white rounded">
                    <strong>Oops!</strong> Please answer all questions!
                </div>`;
                return false;
            } else {
                $ans = [];
                $E = 0;
                $I = 0;
                $S = 0;
                $N = 0;
                $T = 0;
                $F = 0;
                $J = 0;
                $P = 0;
                for (i = 1; i <= 20; i++) {

                    const a = document.querySelector('#A' + i);
                    const b = document.querySelector('#B' + i);

                    if (a.checked) {
                        q = a.value;
                        if (i % 4 == 3) $E++;
                        else if (i % 4 == 2) $S++;
                        else if (i % 4 == 1) $T++;
                        else $J++;

                    } else {
                        q = b.value;
                        if (i % 4 == 3) $I++;
                        else if (i % 4 == 2) $N++;
                        else if (i % 4 == 1) $F++;
                        else $P++;
                    }

                    $ans[i] = q;
                }

                $personality_type = '';
                $personality_type = ($E > $I ? 'e' : 'i');
                $personality_type += ($S > $N ? 's' : 'n');
                $personality_type += ($T > $F ? 't' : 'f');
                $personality_type += ($J > $P ? 'j' : 'p');

                // console.log($ans);
                console.log('Personality Type=' + $personality_type);

                //--------------- with pin---------------//
                var pin = document.getElementById("idGroup").value;
                if (pin) {
                    var checkpin = firebase.database().ref('data-group/' + pin);
                    var checkpinval = null;
                    checkpin.once('value', function(snapshot) {
                        checkpinval = snapshot.val();
                        if (checkpinval != null) {
                            $oldnumber2 = 0;
                            var plusup2 = firebase.database().ref('data-group/' + pin + '/' + $personality_type);
                            plusup2.limitToFirst(1).on('child_added', function(childSnapshot) {
                                $oldnumber2 = childSnapshot.val();
                                plusup2.update({ number: $oldnumber2 + 1 });
                            });

                            $oldnumber1 = 0;
                            var plusup = firebase.database().ref('data-statistics/' + $personality_type);
                            plusup.limitToFirst(1).on('child_added', function(childSnapshot) {
                                $oldnumber1 = childSnapshot.val();

                                plusup.update({ number: $oldnumber1 + 1 }).then(function() {
                                    toresult();
                                });
                            });
                            return true;
                        } else {
                            document.getElementById("warn").innerHTML = `
                            <div class="alert alert-danger alert-white rounded">
                                <strong>Oops!</strong> Please check your PIN again.
                            </div>`;
                            return false;
                        }
                    });
                } else {
                    $oldnumber1 = 0;
                    var plusup = firebase.database().ref('data-statistics/' + $personality_type);
                    plusup.limitToFirst(1).on('child_added', function(childSnapshot) {
                        $oldnumber1 = childSnapshot.val();

                        plusup.update({ number: $oldnumber1 + 1 }).then(function() {
                            toresult();
                        });
                    });
                    return true;
                }
            }
        },
        labels: {
            finish: "Submit",
            next: "Continue",
            previous: "Back"
        }
    });

    function toresult() {
        window.location.href = "pesrsonality-types-" + $personality_type + ".html";
    }

    // Custom Button Jquery Steps
    $('.forward').click(function() {
        $("#wizard").steps('next');
    })
    $('.backward').click(function() {
        $("#wizard").steps('previous');
    })

    // Date Picker
    // var dp1 = $('#dp1').datepicker().data('datepicker');
    // dp1.selectDate(new Date());

    $('#wizard').click(function() {

        if (document.getElementById('check_01').checked) {
            document.getElementById("Q01").innerHTML = `1) เมื่อคุณอยู่ในกลุ่มคนจำนวนมากคุณมักจะ ?`;
            document.getElementById("A01").innerHTML = `พูดคุยกับทุกคนในกลุ่ม`;
            document.getElementById("B01").innerHTML = `พูดคุยเป็นรายบุคคลกับคนที่คุณรู้จักดี`;
            document.getElementById("Q02").innerHTML = `2) คุณมักจะเข้ากันได้ดีกับ . . .`;
            document.getElementById("A02").innerHTML = `คนที่เป็นนักปฏิบัติที่ดี ชอบลงมือทำ`;
            document.getElementById("B02").innerHTML = `คนที่เต็มไปด้วยความคิดใหม่ ๆ`;
            document.getElementById("Q03").innerHTML = `3) ข้อใดที่อธิบายตรงกับตัวคุณได้ดีกว่ากัน ?`;
            document.getElementById("A03").innerHTML = `เหตุผล ความถูกต้อง ความยุติธรรม`;
            document.getElementById("B03").innerHTML = `เมตตากรุณา ความเห็นอกเห็นใจ การให้อภัย`;
            document.getElementById("Q04").innerHTML = `4) สำหรับคุณแล้ว การวางแผน สร้างตารางเวลา เป็นเรื่องที่ . . .`;
            document.getElementById("A04").innerHTML = `จำเป็นและคุณต้องการจะทำ`;
            document.getElementById("B04").innerHTML = `น่าเบื่อและไม่คิดจะทำ`;
            document.getElementById("Q05").innerHTML = `5) เมื่อคุณต้องพบกับคนแปลกหน้าคุณมักจะ . . .`;
            document.getElementById("A05").innerHTML = `สนุกและน่าตื่นเต้น`;
            document.getElementById("B05").innerHTML = `ค่อนข้างจะเป็นปัญหาสำหรับคุณ มักจะรู้สึกเกร็ง ๆ และลำบากใจ`;
            document.getElementById("Q06").innerHTML = `6) ถ้าคุณเป็นครู คุณเลือกที่จะสอน . . .`;
            document.getElementById("A06").innerHTML = `หลักสูตรเชิงตรรกศาสตร์ เช่น สมการและความสัมพันธ์ของสมการ`;
            document.getElementById("B06").innerHTML = `หลักสูตรเชิงทฤษฎี เช่น อธิบายปรากฏการณ์ต่างๆว่าเกิดขึ้นได้อย่างไร`;
            document.getElementById("Q07").innerHTML = `7) ข้อใดเป็นตัวคุณมากที่สุด ?`;
            document.getElementById("A07").innerHTML = `ไม่ค่อยแสดงออกทางอารมณ์และความรู้สึก เยือกเย็น`;
            document.getElementById("B07").innerHTML = `มักจะแสดงทางอารมณ์และความรู้สึกได้ง่าย อ่อนไหวง่าย`;
            document.getElementById("Q08").innerHTML = `8) คุณชอบที่จะ . . .`;
            document.getElementById("A08").innerHTML = `วางแผนสิ่งต่าง ๆ ไว้ล่วงหน้าอย่างละเอียด เช่น วางแผนการจัดปาร์ตี้ เพื่อให้งานออกมาดีที่สุด`;
            document.getElementById("B08").innerHTML = `ใช้ชีวิตอย่างอิสระ ยืดหยุ่นได้เสมอ พร้อมพบเจอกับทุกสิ่งและสนุกไปกับมันเมื่อถึงเวลา`;
            document.getElementById("Q09").innerHTML = `9) คุณเป็นคนที่ . . .`;
            document.getElementById("A09").innerHTML = `เข้ากับผู้อื่นได้ดีและสนิทกันเร็ว`;
            document.getElementById("B09").innerHTML = `ค่อนข้างเงียบและการเข้าหาคุณนั้นเป็นเรื่องที่ยาก`;
            document.getElementById("Q010").innerHTML = `10) คุณชมชื่นคนแบบไหน`;
            document.getElementById("A010").innerHTML = `มีไหวพริบ แก้ปัญหาเฉพาะหน้าได้ดี`;
            document.getElementById("B010").innerHTML = `มีวิสัยทัศน์ มองการณ์ไกล`;
            document.getElementById("Q011").innerHTML = `11) คุณเป็นคนที่ . . .`;
            document.getElementById("A011").innerHTML = `มีความกล้า เด็ดเดี่ยว ช่างวิจารณ์ `;
            document.getElementById("B011").innerHTML = `สุภาพ ขี้สงสาร เห็นอกเห็นใจคนรอบข้าง`;
            document.getElementById("Q012").innerHTML = `12) ในช่วงสุดสัปดาห์คุณเลือกที่จะ . . .`;
            document.getElementById("A012").innerHTML = `หาสิ่งที่ดึงดูดใจ`;
            document.getElementById("B012").innerHTML = `ปล่อยตัวให้ว่าง`;
            document.getElementById("Q013").innerHTML = `13) คุณมักจะ . . .`;
            document.getElementById("A013").innerHTML = `มีเพื่อนหรือคนรู้จักจำนวนมาก`;
            document.getElementById("B013").innerHTML = `มีแค่เพื่อนสนิทไม่กี่คน`;
            document.getElementById("Q014").innerHTML = `14) คุณอยากจะมีเพื่อนสักคนที่ . . .`;
            document.getElementById("A014").innerHTML = `อยู่กับความเป็นจริง`;
            document.getElementById("B014").innerHTML = `คิดนอกกรอบและมาพร้อมกับความคิดใหม่ ๆ`;
            document.getElementById("Q015").innerHTML = `15) เมื่อเพื่อนของคุณทะเลาะกัน คุณจะแก้ไขปัญหาโดย . . .`;
            document.getElementById("A015").innerHTML = `คุยกันตรง ๆ ว่าเกิดอะไรขึ้นเเละจะเอายังไงต่อไป`;
            document.getElementById("B015").innerHTML = `ประนีประนอม หาความปรองดอง`;
            document.getElementById("Q016").innerHTML = `16) เมื่อคุณจะต้องทำบางสิ่งในเวลาที่จำกัด . . .`;
            document.getElementById("A016").innerHTML = `การทำงานภายใต้ความกดดันไม่เป็นปัญหาสำหรับคุณ`;
            document.getElementById("B016").innerHTML = `ทำให้ฉันรู้สึกไม่พอใจและเครียดเป็นอย่างมาก`;
            document.getElementById("Q017").innerHTML = `17) ในงานปาร์ตี้คุณรู้สึก . . .`;
            document.getElementById("A017").innerHTML = `สนุก`;
            document.getElementById("B017").innerHTML = `เบื่อหน่าย`;
            document.getElementById("Q018").innerHTML = `18) คุณมักจะได้รับการชื่นชมว่า . . .`;
            document.getElementById("A018").innerHTML = `เป็นคนขยัน`;
            document.getElementById("B018").innerHTML = `เป็นคนที่มีความคิดสร้างสรรค์`;
            document.getElementById("Q019").innerHTML = `19) คนที่ควรได้รับคำชื่นชมมากที่สุดคือ . . .`;
            document.getElementById("A019").innerHTML = `คนที่พูดความจริงอย่างตรงไปตรงมา`;
            document.getElementById("B019").innerHTML = `คนที่พูดแบบรักษาน้ำใจ`;
            document.getElementById("Q020").innerHTML = `20) มันยากสำหรับคุณที่จะต้องทำบางสิ่งบางอย่างที่ . . .`;
            document.getElementById("A020").innerHTML = `มีเปลี่ยนแปลงอยู่เสมอ`;
            document.getElementById("B020").innerHTML = `มีความจำเจ เป็นกิจวัตร`;
        } else {
            document.getElementById("Q01").innerHTML = `1) When you are with a group of people, would you usually rather?`;
            document.getElementById("A01").innerHTML = `Join in the talk of the group`;
            document.getElementById("B01").innerHTML = `Talk individually with people you know well`;
            document.getElementById("Q02").innerHTML = `2) Do you usually get along better with . . .`;
            document.getElementById("A02").innerHTML = `Realistic people`;
            document.getElementById("B02").innerHTML = `Imaginative people`;
            document.getElementById("Q03").innerHTML = `3. Which word in the pair appeals to you more?`;
            document.getElementById("A03").innerHTML = `Analyze`;
            document.getElementById("B03").innerHTML = `Sympathize`;
            document.getElementById("Q04").innerHTML = `4) Does following a schedule . . .`;
            document.getElementById("A04").innerHTML = `Appeal to you`;
            document.getElementById("B04").innerHTML = `Cramp you`;
            document.getElementById("Q05").innerHTML = `5) When you have to meet strangers, do you find it . . .`;
            document.getElementById("A05").innerHTML = `Pleasant, or at lease easy`;
            document.getElementById("B05").innerHTML = `Something that takes a good deal of effort`;
            document.getElementById("Q06").innerHTML = `6) If you were a teacher, would you rather teach . . .`;
            document.getElementById("A06").innerHTML = `Fact courses`;
            document.getElementById("B06").innerHTML = `Courses involving theory`;
            document.getElementById("Q07").innerHTML = `7) Which word in the pair appeals to you more?`;
            document.getElementById("A07").innerHTML = `Foresight`;
            document.getElementById("B07").innerHTML = `Compassion`;
            document.getElementById("Q08").innerHTML = `8) Do you prefer to . . .`;
            document.getElementById("A08").innerHTML = `Arrange dates, parties, etc., well in advance`;
            document.getElementById("B08").innerHTML = `Be free to do whatever looks like fun when the time comes`;
            document.getElementById("Q09").innerHTML = `9) Are you . . .`;
            document.getElementById("A09").innerHTML = `Easy to get to know`;
            document.getElementById("B09").innerHTML = `Hard to get to know`;
            document.getElementById("Q010").innerHTML = `10) Is it higher praise to say someone has . . .`;
            document.getElementById("A010").innerHTML = `Common sense`;
            document.getElementById("B010").innerHTML = `Vision`;
            document.getElementById("Q011").innerHTML = `11) Which word in the pair appeals to you more?`;
            document.getElementById("A011").innerHTML = `Firm`;
            document.getElementById("B011").innerHTML = `Gentle`;
            document.getElementById("Q012").innerHTML = `12) Does the idea of making a list of what you should get done over a weekend . . .`;
            document.getElementById("A012").innerHTML = `Appeal to you`;
            document.getElementById("B012").innerHTML = `Leave you cold`;
            document.getElementById("Q013").innerHTML = `13) Do you tend to have . . .`;
            document.getElementById("A013").innerHTML = `Broad friendships with many different people`;
            document.getElementById("B013").innerHTML = `Deep friendships with a very few people`;
            document.getElementById("Q014").innerHTML = `14) Would you rather have as a friend someone who . . .`;
            document.getElementById("A014").innerHTML = `Has both feet on the ground`;
            document.getElementById("B014").innerHTML = `Is always coming up with new ideas`;
            document.getElementById("Q015").innerHTML = `15) When your friends argue, you will resolve this problem by . . .`;
            document.getElementById("A015").innerHTML = `Come straight to the point`;
            document.getElementById("B015").innerHTML = `Conciliate them`;
            document.getElementById("Q016").innerHTML = `16) When it is settled well in advance that you will do a certain thing at a certain time, do you find it . . .`;
            document.getElementById("A016").innerHTML = `Nice to be able to plan accordingly`;
            document.getElementById("B016").innerHTML = `A little unpleasant to be tied down`;
            document.getElementById("Q017").innerHTML = `17) At parties, do you . . .`;
            document.getElementById("A017").innerHTML = `Always have fun`;
            document.getElementById("B017").innerHTML = `Sometimes get bored`;
            document.getElementById("Q018").innerHTML = `18) Would you rather be considered . . .`;
            document.getElementById("A018").innerHTML = `A practical person`;
            document.getElementById("B018").innerHTML = `An ingenious person`;
            document.getElementById("Q019").innerHTML = `19) Is it a higher compliment to be called . . .`;
            document.getElementById("A019").innerHTML = `A consistently reasonable person`;
            document.getElementById("B019").innerHTML = `A person of real feeling`;
            document.getElementById("Q020").innerHTML = `20) Is it harder for you to adapt to . . .`;
            document.getElementById("A020").innerHTML = `Constant change`;
            document.getElementById("B020").innerHTML = `Routine`;

        }

        $percent = 0;
        for (i = 1; i <= 20; i++) {
            if (document.getElementById('A' + i).checked || document.getElementById('B' + i).checked) {
                $percent += 5;

                document.getElementById("percent").innerHTML = `#MBTI - ` + $percent + `%`;
            }
        }
    })

})
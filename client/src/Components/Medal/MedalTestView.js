import React, { useState } from "react";
import Medal from "./Medal";

const MedalTestView = () => {
  const [state, setstate] = useState({
    post: {
      postId: 6,
      postText:
        '{"blocks":[{"key":"f3bnp","text":"ইলিয়াস কাঞ্চন","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cb32v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bpppv","text":"ইদ্রিস আলী[১] (জন্ম: ২৪ ডিসেম্বর, ১৯৫৬)[২] (যিনি ইলিয়াস কাঞ্চন নামে জনপ্রিয়) একজন বাংলাদেশী চলচ্চিত্র ও নাট্য অভিনেতা এবং ‘নিরাপদ সড়ক চাই’ সংগঠনের প্রতিষ্ঠাতা সভাপতি। তিনি ১৯৭৭ সালে বসুন্ধরা চলচ্চিত্রের মাধ্যমে চলচ্চিত্রে অভিনয় শুরু করেন। তিনি বাংলাদেশী চলচ্চিত্রের নব্বইয়ের দশকের একজন জনপ্রিয় চলচ্চিত্র অভিনেতা। কাঞ্চন ৩০০ টিরও বেশি চলচ্চিত্রে অভিনয় করেন। তার অভিনীত বেদের মেয়ে জোছনা (১৯৮৯) ছবিটি এখন পর্যন্ত বাংলাদেশের সর্বাধিক ব্যবসাসফল ও জনপ্রিয় চলচ্চিত্র হিসেবে স্বীকৃত। তিনি একাধিকবার জাতীয় চলচ্চিত্র পুরস্কার ও বাচসাস পুরস্কার অর্জন করেন।","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":10,"style":"BOLD"},{"offset":49,"length":14,"style":"BOLD"},{"offset":375,"length":17,"style":"ITALIC"}],"entityRanges":[{"offset":10,"length":3,"key":0},{"offset":39,"length":3,"key":1},{"offset":84,"length":9,"key":2},{"offset":375,"length":17,"key":3},{"offset":500,"length":25,"key":4},{"offset":528,"length":15,"key":5}],"data":{}},{"key":"2u1kf","text":"তিনি বাংলাদেশ চলচ্চিত্র শিল্পী সমিতির সাধারণ সম্পাদকের দায়িত্ব পালন করেছিলেন।[৩] তার প্রথম স্ত্রী জাহানারা কাঞ্চনের মৃত্যুর পর তিনি নিরাপদ সড়ক চাই আন্দোলন গড়ে তুলেন।[৪] সমাজসেবায় তার এই অবদানের জন্য বাংলাদেশ সরকার ২০১৭ সালে তাকে দেশের দ্বিতীয় সর্বোচ্চ বেসামরিক সম্মাননা একুশে পদকে ভূষিত করে।[৫]","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":5,"length":32,"key":6},{"offset":78,"length":3,"key":7},{"offset":168,"length":3,"key":8},{"offset":203,"length":14,"key":9},{"offset":275,"length":10,"key":10},{"offset":296,"length":3,"key":11}],"data":{}}],"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-1","url":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-1"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-2","url":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-2"}},"2":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6%E0%A7%80","title":"বাংলাদেশী","url":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6%E0%A7%80"}},"3":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0_%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87_%E0%A6%9C%E0%A7%8B%E0%A6%9B%E0%A6%A8%E0%A6%BE","title":"বেদের মেয়ে জোছনা","url":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0_%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87_%E0%A6%9C%E0%A7%8B%E0%A6%9B%E0%A6%A8%E0%A6%BE"}},"4":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%9C%E0%A6%BE%E0%A6%A4%E0%A7%80%E0%A6%AF%E0%A6%BC_%E0%A6%9A%E0%A6%B2%E0%A6%9A%E0%A7%8D%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0_(%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6)","title":"জাতীয় চলচ্চিত্র পুরস্কার (বাংলাদেশ)","url":"https://bn.wikipedia.org/wiki/%E0%A6%9C%E0%A6%BE%E0%A6%A4%E0%A7%80%E0%A6%AF%E0%A6%BC_%E0%A6%9A%E0%A6%B2%E0%A6%9A%E0%A7%8D%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0_(%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6)"}},"5":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%9A%E0%A6%B8%E0%A6%BE%E0%A6%B8_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0","title":"বাচসাস পুরস্কার","url":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%9A%E0%A6%B8%E0%A6%BE%E0%A6%B8_%E0%A6%AA%E0%A7%81%E0%A6%B0%E0%A6%B8%E0%A7%8D%E0%A6%95%E0%A6%BE%E0%A6%B0"}},"6":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%9A%E0%A6%B2%E0%A6%9A%E0%A7%8D%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0_%E0%A6%B6%E0%A6%BF%E0%A6%B2%E0%A7%8D%E0%A6%AA%E0%A7%80_%E0%A6%B8%E0%A6%AE%E0%A6%BF%E0%A6%A4%E0%A6%BF","title":"বাংলাদেশ চলচ্চিত্র শিল্পী সমিতি","url":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%9A%E0%A6%B2%E0%A6%9A%E0%A7%8D%E0%A6%9A%E0%A6%BF%E0%A6%A4%E0%A7%8D%E0%A6%B0_%E0%A6%B6%E0%A6%BF%E0%A6%B2%E0%A7%8D%E0%A6%AA%E0%A7%80_%E0%A6%B8%E0%A6%AE%E0%A6%BF%E0%A6%A4%E0%A6%BF"}},"7":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-3","url":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-3"}},"8":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-4","url":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-4"}},"9":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%B8%E0%A6%B0%E0%A6%95%E0%A6%BE%E0%A6%B0","title":"বাংলাদেশ সরকার","url":"https://bn.wikipedia.org/wiki/%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%E0%A6%A6%E0%A7%87%E0%A6%B6_%E0%A6%B8%E0%A6%B0%E0%A6%95%E0%A6%BE%E0%A6%B0"}},"10":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%8F%E0%A6%95%E0%A7%81%E0%A6%B6%E0%A7%87_%E0%A6%AA%E0%A6%A6%E0%A6%95","title":"একুশে পদক","url":"https://bn.wikipedia.org/wiki/%E0%A6%8F%E0%A6%95%E0%A7%81%E0%A6%B6%E0%A7%87_%E0%A6%AA%E0%A6%A6%E0%A6%95"}},"11":{"type":"LINK","mutability":"MUTABLE","data":{"href":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-5","url":"https://bn.wikipedia.org/wiki/%E0%A6%87%E0%A6%B2%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE%E0%A6%B8_%E0%A6%95%E0%A6%BE%E0%A6%9E%E0%A7%8D%E0%A6%9A%E0%A6%A8#cite_note-5"}}}}',
      postTitle: "ইলিয়াস কাঞ্চন",
      creationDate: "2021-03-18T01:36:03.498+00:00",
      user: {
        userId: 8,
        userName: "iliyas",
        profilePicture:
          "https://upload.wikimedia.org/wikipedia/commons/0/0c/Ilias_Kanchan_%28cropped%29.jpg",
        firstName: "iliyas",
        lastName: "kanchon",
        email: "iliyas@demo.com",
        dateOfBirth: "1956-03-18",
        city: "Dhaka",
        country: "Bangladesh",
        gender: "",
        totalNumberOfFollower: 1,
        totalNumberOfUserFollowed: 1,
        userDescription: null,
        emailVisible: false,
        emailVerified: false,
      },
      totalBronze: 0,
      totalSilver: 0,
      totalGold: 1,
      tags: [],
      medalTypeProvidedByLoggedInUser: null,
      draft: false,
    },
  });
  return (
    <div style={{ margin: "100px" }}>
      <Medal {...state} />
    </div>
  );
};

export default MedalTestView;

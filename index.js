import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
// document response the click on entire page 
document.addEventListener('click', function(e){
  if(e.target.dataset.like){
    handleLikeclick(e.target.dataset.like)
} 
else if(e.target.dataset.retweet){
    handleRetweetClick(e.target.dataset.retweet)
}
else if(e.target.dataset.reply){
    handleReplyClick(e.target.dataset.reply)
}
else if(e.target.id === 'tweet-btn'){
  handleTweetBtnClick()
}
})

function handleLikeclick(tweetId){
    const targetTweetObj =
     tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0] // returns object 

 if(targetTweetObj.isLiked === true){
    targetTweetObj.likes--   // dec the likes
  
 }else {
    targetTweetObj.isLiked === false
    targetTweetObj.likes++
   
 }
 targetTweetObj.isLiked = !targetTweetObj.isLiked // flipes boolean
    render()  
}
function handleRetweetClick(tweetId){
 const targetTweet = 
 tweetsData.filter(function(tweet){
    return tweet.uuid === tweetId
 })[0]
 if(targetTweet.isRetweeted === true){
    targetTweet.retweets -- 
 }else{
    targetTweet.isRetweeted === false
    targetTweet.retweets ++
 }
 targetTweet.isRetweeted = !targetTweet.isRetweeted
  render()
}

function handleReplyClick(replyId){
 document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}
function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')
    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Shorena 💕`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        }) 
        render()
        tweetInput.value = ''
    }
}
function getFeedHtml(){
    let feedHmlt = ``
    tweetsData.forEach(function(tweet){
        let likeIconClass = ''
        let isRetweetedClass = ''

        if(tweet.isLiked){
            likeIconClass = 'liked'
        }
        if(tweet.isRetweeted){
            isRetweetedClass = 'retweeted'
        }

        let repliesHtml = ''
        if(tweet.replies.length > 0){
            tweet.replies.filter(function(singlereply){
                repliesHtml += `
                    <div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${singlereply.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${singlereply.handle}</p>
                    <p class="tweet-text">${singlereply.tweetText}</p>
                </div>
            </div>
        </div>
         `
            })
        } 
        feedHmlt += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">

                        <i class= "fa-regular fa-comment-dots "
                        data-reply="${tweet.uuid}"
                        > </i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">

                        <i class= "fa-solid fa-heart ${likeIconClass}"
                        data-like="${tweet.uuid}"
                         ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">

                        <i class= "fa-solid fa-retweet ${isRetweetedClass}" 
                        data-retweet="${tweet.uuid}"
                        > </i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}"> 
              ${repliesHtml}
            </div>
        </div>
    `
    })
return feedHmlt
}

getFeedHtml()

function render(){
//     feed.innerHTML =  getFeedHtml()
 document.getElementById('feed').innerHTML = getFeedHtml()
}
render()

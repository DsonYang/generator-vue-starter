
export default {
  components: {
    
  },
  data: function(){
    return {
      bingo:""
    }
  },
  mounted: function(){
    this.fetchBingo()
  },
  methods: {
    fetchBingo(){
      Utils.request.get(Constants.APIS.GET_BINGO).then((res) => {
        this.bingo = res.data.message
      }).catch((error)=>{
        
      })
    }
  }
}
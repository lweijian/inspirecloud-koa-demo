const axios=require('axios')


describe('test',() => {
    it('testApi',async ()=>{
        const res= await axios.get('http://127.0.0.1:3000/api/test')
        expect(res.data).toBe('test');
    })
})

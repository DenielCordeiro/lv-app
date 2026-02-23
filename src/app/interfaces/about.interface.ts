export interface About {
    _id: string,
    company: { 
        title: string,
        paragraph: [
            {
                _id: number,
                phrases: string,
            }
        ],
    },
    businesswoman: {
        title: string,
        paragraph: [
            {
                _id: number,
                phrases: string,
            }
        ],
    }
}
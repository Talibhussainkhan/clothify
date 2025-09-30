
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.json({ success: false, message: 'Missing Details!' })

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Invalid Credentials' })
        }

        res.json({ success: true, message: 'Login successfully!' })
    } catch (error) {
        res.json({ success: false, message: error.message });
        console.log(error.message)
    }
}
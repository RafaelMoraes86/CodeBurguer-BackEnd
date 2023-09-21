import * as Yup from 'yup'
import User from '../models/User'

class SessionController {
    async store(request, response) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        })

        const userEmailOrPassawordIncorrect = () => {
            return response
                .status(400)
                .json({ error: 'Sua senha ou seu login estão incorretos.' })
        }

        if (!(await schema.isValid(request.body))) userEmailOrPassawordIncorrect()


        const { email, password } = request.body

        const user = await User.findOne({
            where: { email },
        })

        if (!user) userEmailOrPassawordIncorrect()

        if (!(await user.checkPassword(password))) userEmailOrPassawordIncorrect()



        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
        })
    }

}

export default new SessionController()


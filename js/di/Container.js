export class Container
{
    constructor()
    {
        this.registry = new Map();
    }

    RegisterSingleton(name, className)
    {
        this.registry.set(name, {
            className,
            instance: null,
        });
    }

    RegisterSingletonAtPlace(name, constructor)
    {
        this.registry.set(name, {
            instance: constructor(),
        });
    }

    GetInstance(name)
    {
        const registration = this.registry.get(name);

        if (!registration)
        {
            throw new Error(`No registration found for ${name}`);
        }

        if (!registration.instance)
        {
            registration.instance = new registration.className(this);
        }

        return registration.instance;
    }
}